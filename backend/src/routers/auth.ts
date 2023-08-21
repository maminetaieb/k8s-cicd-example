import express from 'express'
import config from '../config/main'
import { AuthController } from '../controllers'
import { checkAuth } from '../middlewares'

const AuthRouter = express.Router()

AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/refresh', AuthController.refresh)

if (config.env === 'development')
  AuthRouter.post('/signup', AuthController.signup)
else {
  AuthRouter.post('/signup', (req, res) => {
    res.status(403).json({
      error:
        'You must be running the server in development mode to add new users.',
    })
  })
}

// must be authenticated
AuthRouter.get('/me', checkAuth(), AuthController.me)
AuthRouter.put('/me', checkAuth(), AuthController.updateDisplayName)

AuthRouter.put('/password', checkAuth(), AuthController.changePassword)

AuthRouter.get('/tokens', checkAuth(), AuthController.getAllTokens)
AuthRouter.delete('/tokens/:id', checkAuth(), AuthController.revokeToken)
AuthRouter.delete('/tokens', checkAuth(), AuthController.revokeAllTokens)

export { AuthRouter }
