import { Request, Response, NextFunction } from 'express'
import { DomainsServices } from '../services'
import { BadRequestError, NotFoundError } from '../utils/errors'
import { PaginationValidator, DomainsValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = DomainsValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const domains = await DomainsServices.findAll(filters, options)

  res.status(200).json(domains)
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const domainId = req.params.id.toString()
  try {
    const domain = await DomainsServices.findOne(domainId)
    if (!domain) throw new Error('Domain not found')
    res.status(200).json(domain)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}
