import express from 'express'
import { LocationsController } from '../controllers'

const LocateRouter = express.Router()

/**
 * Get the location using the locationcode
 */
LocateRouter.get('/:code', LocationsController.getOne)

export { LocateRouter }
