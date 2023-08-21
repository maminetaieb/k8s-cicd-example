import express from 'express'
import { AdvertisementsController } from '../controllers'

const AdvertisementsRouter = express.Router()

AdvertisementsRouter.get('/:id', AdvertisementsController.getOne)

AdvertisementsRouter.get('/', AdvertisementsController.getAll)

export { AdvertisementsRouter }
