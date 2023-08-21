import { NextFunction, Request, Response } from 'express'
import { LogServices } from '../services'
import { LogsValidator, PaginationValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = LogsValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const orders = await LogServices.findAll(filters, options)

  res.status(200).json(orders)
}
