import express from 'express'
import { UsersController } from '../controllers'

const UsersRouter = express.Router()

/**
 * Read a user using their ID
 */
UsersRouter.get('/:id', UsersController.getOne)

// user specific routes
UsersRouter.post('/:id/suspend', UsersController.suspend)

/**
 * Get all users
 * You can filter results
 */
UsersRouter.get('/', UsersController.getAll)

export { UsersRouter }
