import { NextFunction, Request, Response } from 'express'
import { BadRequestError, NotFoundError } from '../utils/errors'
import { DeliveryOrdersServices } from '../services'
import { DeliveryOrdersValidator, PaginationValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = DeliveryOrdersValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const deliveryOrders = await DeliveryOrdersServices.findAll(filters, options)

  res.status(200).json(deliveryOrders)
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const deliveryOrderId = req.params.id.toString()
  try {
    const deliveryOrder = await DeliveryOrdersServices.findOne(deliveryOrderId)
    if (!deliveryOrder) throw new Error('DeliveryOrder Not Found.')
    res.status(200).json(deliveryOrder)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}
