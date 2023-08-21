import { Request, Response, NextFunction } from 'express'
import { AnalyticsServices, PartnersServices } from '../services'
import { parseBoolean, parseInterval } from '../utils'
import { BadRequestError, NotFoundError } from '../utils/errors'
import { PaginationValidator, PartnersValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = PartnersValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const users = await PartnersServices.findAll(filters, options)

  res.status(200).json(users)
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const id = req.params.id.toString()
  try {
    const partner = await PartnersServices.findOne(id)
    if (!partner) throw new Error('User not found')
    res.status(200).json(partner)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}

/**
 * @param {boolean} req.body.value suspend the partner if this is true, otherwise unusupend the partner
 */
export const suspend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const partnerId = req.params.id.toString()
  const suspend = parseBoolean(req.body.value.toString())
  if (suspend === undefined) {
    return next(new BadRequestError('Value must be boolean.'))
  }
  try {
    await PartnersServices.suspend(partnerId, suspend)
    res.status(200).json({ message: 'partner suspended successfully' })
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}

export const getPartnerViews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const partnerId = req.params.id.toString()

  const interval = parseInterval(req.query.since)
  const views = await AnalyticsServices.getPartnerViews(partnerId, interval)

  res.json({
    views,
  })
}

export const getPartnerSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const partnerId = req.params.id.toString()

  const interval = parseInterval(req.query.since)
  const sales = await AnalyticsServices.getPartnerSales(partnerId, interval)

  res.json({
    sales,
  })
}
