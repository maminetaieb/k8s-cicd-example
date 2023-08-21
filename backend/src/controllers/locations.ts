import { Request, Response, NextFunction } from 'express'
import { LocationsServices } from '../services'
import { BadRequestError, NotFoundError } from '../utils/errors'

/**
 * contains code param
 * /locations/:code
 */
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.code) {
    return next(new BadRequestError('Request missing location code.'))
  }
  const locationCode = req.params.code.toString()
  try {
    const location = await LocationsServices.findOne(locationCode)
    if (!location) throw new Error('Not Found.')
    res.status(200).json(location)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}
