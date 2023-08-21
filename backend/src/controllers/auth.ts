import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from '../config/main'
import { User, UserDocument } from '../models'
import { LogServices } from '../services'
import { LogActions } from '../config/log'
import { reject } from 'lodash'

interface LoginPayload {
  sub: string
}

export const me = (req: Request, res: Response) => {
  const user = req.user as UserDocument
  const lastLogin = user.lastLogin.length < 2 ? null : user.lastLogin[0]

  res.status(200).json({
    displayName: user.displayName,
    username: user.username,
    lastActive: user.lastActive,
    lastLogin,
  })
}

export const updateDisplayName = async (req: Request, res: Response) => {
  const user = req.user as UserDocument
  const displayName = (req.body.displayName as string) || ''

  try {
    const oldDisplayName = user.displayName
    user.displayName = displayName
    await user.save()
    await LogServices.add({
      user,
      action: LogActions.edit_user_info,
      description: oldDisplayName
        ? `Edited their display name from ${oldDisplayName} to ${displayName}`
        : `Set their display name to ${displayName}`,
    })
    return res.status(200).json({
      message: 'Display name changed successfully',
    })
  } catch (err: unknown) {
    const errorMessage = (err as Error).message
    return res.status(400).json({
      error: 'Display name change failed',
      message: errorMessage,
    })
  }
}

export const login = (req: Request, res: Response) => {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user: UserDocument, info) => {
      if (err || !user) {
        return res.status(400).json({
          error: info ? info.message : 'Login failed',
        })
      }

      const payload: LoginPayload = { sub: user._id }

      const access = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      })
      const refresh = jwt.sign(payload, config.jwtRefresh.secret, {
        expiresIn: config.jwtRefresh.expiresIn,
      })

      user.tokens.push({
        token: refresh,
        ipAddress: req.ip,
        lastActive: new Date(),
      })
      user.lastActive = new Date()
      // push current date as last login
      user.lastLogin.push(new Date())
      // remove the previous last login
      if (user.lastLogin.length > 2) user.lastLogin.shift()

      await user.save()
      await LogServices.add({
        user,
        action: LogActions.login,
        description: `Logged in.`,
      })

      return res.status(200).json({ access, refresh })
    }
  )(req, res)
}

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.body.refresh
  if (refreshToken === undefined) {
    return res.status(400).json({ error: 'You must provide a refresh token' })
  }

  try {
    let verified
    try {
      verified = jwt.verify(
        refreshToken,
        config.jwtRefresh.secret
      ) as LoginPayload
    } catch (err: unknown) {
      return res.status(400).json({ error: (err as Error).message })
    }

    const user = await User.findById(verified.sub).exec()

    if (!user) throw new Error('User does not exist')

    const token = user.tokens.find((token) => token.token === refreshToken)
    if (!token) {
      return res.status(401).json({ error: 'Token does not exist' })
    }
    token.lastActive = new Date()
    token.ipAddress = req.ip

    user.lastActive = new Date()

    await user.save()

    // create new access token
    const payload: LoginPayload = { sub: user._id }
    const access = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    })

    return res.status(200).json({ access })
  } catch (err: unknown) {
    return res.status(401).json({ error: (err as Error).message })
  }
}

export const signup = async (req: Request, res: Response) => {
  const {
    displayName,
    username,
    password,
  }: { displayName: string; username: string; password: string } = req.body

  // check if the user exists in the database
  const exists = await User.findOne({ username }).exec()
  if (exists) {
    return res.status(400).json({
      error: 'User already exists',
    })
  }
  const user = new User({
    displayName,
    username,
    password,
  })

  try {
    await user.save()
    await LogServices.add({
      user,
      action: LogActions.joined,
      description: `Joined the platform.`,
    })
    return res.status(201).json({
      message: 'Account created successfully',
    })
  } catch (err: unknown) {
    const errorMessage = (err as Error).message
    return res.status(400).json({
      error: 'Failed creating account.',
      message: errorMessage,
    })
  }
}

export const revokeToken = async (req: Request, res: Response) => {
  const user = req.user as UserDocument
  const refreshToken = req.params.id
  if (refreshToken === undefined) {
    return res.status(401).json({ error: 'You must provide a refresh token' })
  }
  const token = user.tokens.find((token) => token.token === refreshToken)
  if (!token) {
    return res.status(401).json({ error: 'Token does not exist' })
  }

  try {
    user.tokens = reject(
      user.tokens,
      (element) => element.token === refreshToken
    )
    await user.save()
    await LogServices.add({
      user,
      action: LogActions.revoke_token,
      description: `Revoke a token.`,
    })
    return res.status(200).json({
      message: 'Token removed successfully',
    })
  } catch (err: unknown) {
    const errorMessage = (err as Error).message
    return res.status(400).json({
      error: 'Token removal failed',
      message: errorMessage,
    })
  }
}

export const revokeAllTokens = async (req: Request, res: Response) => {
  const user = req.user as UserDocument
  try {
    user.tokens = []
    await user.save()
    await LogServices.add({
      user,
      action: LogActions.revoke_all_tokens,
      description: `Revoke all tokens.`,
    })
    return res.status(200).json({
      message: 'Token removed successfully',
    })
  } catch (err: unknown) {
    const errorMessage = (err as Error).message
    return res.status(400).json({
      error: 'Token removal failed',
      message: errorMessage,
    })
  }
}

export const getAllTokens = async (req: Request, res: Response) => {
  const user = req.user as UserDocument
  return res.status(200).json({
    tokens: user.tokens,
  })
}

export const changePassword = async (req: Request, res: Response) => {
  const user = req.user as UserDocument

  const currentPassword = req.body.oldPassword as string
  const newPassword = req.body.newPassword as string

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      error: 'You must provide current and a new password',
    })
  }

  if (!user.validPassword(currentPassword)) {
    return res.status(400).json({
      error: "Password doesn't match",
    })
  }

  if (newPassword.length < 8 || newPassword.length > 32) {
    return res.status(400).json({
      error: 'Password length should be between 8 and 32 characters',
    })
  }

  try {
    user.password = newPassword
    await user.save()
    await LogServices.add({
      user,
      action: LogActions.edit_user_info,
      description: `Updated password.`,
    })
    return res.status(200).json({
      message: 'Password changed successfully',
    })
  } catch (err: unknown) {
    const errorMessage = (err as Error).message
    return res.status(400).json({
      error: 'Password change failed',
      message: errorMessage,
    })
  }
}
