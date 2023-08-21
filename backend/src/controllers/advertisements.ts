import { Request, Response, NextFunction } from 'express'
import { AdvertisementsServices } from '../services'
import { AdvertisementsValidator, PaginationValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = AdvertisementsValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const advertisements = AdvertisementsServices.findAll(filters, options)

  res.json(200).json(advertisements)
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new Error('Req missing id'))
  }
  try {
    const advertisementId = req.params.id.toString()
    const advertisement = await AdvertisementsServices.findOne(advertisementId)
    if (!advertisement) throw new Error('Ad not found')
    res.status(200).json(advertisement)
  } catch (error: unknown) {
    return next(error as Error)
  }
}
