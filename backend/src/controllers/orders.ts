import { NextFunction, Request, Response } from 'express'
import { BadRequestError, NotFoundError } from '../utils/errors'
import { OrdersServices } from '../services'
import { OrdersValidator, PaginationValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = OrdersValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const orders = await OrdersServices.findAll(filters, options)

  res.status(200).json(orders)
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const orderId = req.params.id.toString()
  try {
    const order = await OrdersServices.findOne(orderId)
    if (!order) throw new Error('Order Not Found.')
    res.status(200).json(order)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}
