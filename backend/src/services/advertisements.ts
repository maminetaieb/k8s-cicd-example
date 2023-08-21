import { Advertisement } from '../models/shared'
import { AdvertisementsValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: AdvertisementsValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const advertisements = await Advertisement.findAll(filters, {
    sort,
    page,
    limit,
    lean: true,
  })

  return advertisements
}

export const findOne = async (id: string) => {
  const advertisement = await Advertisement.findOne({ _id: id }).exec()
  return advertisement?.toObject()
}
