import express from 'express'
import { ProductsController } from '../controllers'

const ProductsRouter = express.Router()

ProductsRouter.get('/:id', ProductsController.getOne)

ProductsRouter.get('/', ProductsController.getAll)

export { ProductsRouter }
