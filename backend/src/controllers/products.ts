import { Request, Response, NextFunction } from 'express'
import { ProductsServices } from '../services'
import { ProductsValidator, PaginationValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = ProductsValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const products = await ProductsServices.findAll(filters, options)

  res.status(200).json(products)
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new Error('id required'))
  }
  const productId = req.params.id.toString()
  try {
    const product = await ProductsServices.findOne(productId)
    if (!product) throw new Error('Produt not found')
    res.status(200).json(product)
  } catch (error: unknown) {
    return next(error as Error)
  }
}
