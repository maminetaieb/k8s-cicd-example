import express from 'express'
import { OrdersController } from '../controllers'

const OrdersRouter = express.Router()

/**
 * Get one Order
 */
OrdersRouter.get('/:id', OrdersController.getOne)

/**
 * Get All Orders
 */
OrdersRouter.get('/', OrdersController.getAll)

/**
 * Can not post Orders
 */
OrdersRouter.post('/', (req, res) => {
  res.status(403).send('Operation not supported')
})

export { OrdersRouter }
