import { Request, Response, NextFunction } from 'express'
import { UserServices } from '../services'
import { parseBoolean } from '../utils'
import { BadRequestError, NotFoundError } from '../utils/errors'
import { PaginationValidator, UsersValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = UsersValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const users = await UserServices.findAll(filters, options)

  res.status(200).json(users)
}

// TODO rework error handling
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    // sanity check
    return next(new BadRequestError('Request missing id.'))
  }
  const userId = req.params.id.toString()
  try {
    const user = await UserServices.findOne(userId)
    if (!user) throw new Error('User not found')
    res.status(200).json(user)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}

/**
 * @param {boolean} req.body.value suspend if this is true, otherwise unusupend the partner
 */
export const suspend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    // sanity check
    return next(new BadRequestError('Request missing id.'))
  }
  const userId = req.params.id.toString()
  const suspend = parseBoolean(req.body.value.toString())
  if (suspend === undefined) {
    return next(new BadRequestError('Value must be boolean.'))
  }
  try {
    await UserServices.suspend(userId, suspend)
    res.status(200).json({ message: 'user suspended successfully' })
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}
