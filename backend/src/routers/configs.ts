import express from 'express'
import { ConfigsController } from '../controllers'

const ConfigsRouter = express.Router()

ConfigsRouter.get('/', ConfigsController.get)
ConfigsRouter.put('/', ConfigsController.update)

export { ConfigsRouter }
