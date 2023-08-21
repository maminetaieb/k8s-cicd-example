import express from 'express'
import { DeliveryOrdersController } from '../controllers'

const DeliveryOrdersRouter = express.Router()

/**
 * Get one DeliveryOrder
 */
DeliveryOrdersRouter.get('/:id', DeliveryOrdersController.getOne)

/**
 * Get All DeliveryOrders
 */
DeliveryOrdersRouter.get('/', DeliveryOrdersController.getAll)

/**
 * Can not post DeliveryOrders
 */
DeliveryOrdersRouter.post('/', (req, res) => {
  res.status(403).send('Operation not supported')
})

export { DeliveryOrdersRouter }
