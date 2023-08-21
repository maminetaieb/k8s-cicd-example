import express from 'express'
import { LogController } from '../controllers'

const LogRouter = express.Router()

/**
 * Get All Log
 */
LogRouter.get('/', LogController.getAll)

export { LogRouter }
