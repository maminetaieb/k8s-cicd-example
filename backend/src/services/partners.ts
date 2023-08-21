import { Partner } from '../models/shared'
import { PartnersValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: PartnersValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const partners = await Partner.paginate(filters, {
    populate: ['owner', 'services', 'domain', 'categories'],
    sort,
    page,
    limit,
    lean: true,
  })
  return partners
}

export const findOne = async (id: string) => {
  const partner = await Partner.findOne({ _id: id })
    .populate(['owner', 'services', 'domain', 'delivery.regions', 'categories'])
    .populate([
      {
        path: 'delivery.cities',
        populate: {
          path: 'city',
          model: 'City',
        },
      },
      {
        path: 'deliverers',
        populate: {
          path: 'user',
          model: 'User',
        },
      },
      {
        path: 'managers',
        populate: [
          {
            path: 'user',
            model: 'User',
          },
          {
            path: 'access',
            model: 'Access',
          },
        ],
      },
      {
        path: 'categories',
        populate: {
          path: 'subCategories',
          model: 'SubCategory',
          populate: {
            path: 'products',
            model: 'Product',
          },
        },
      },
    ])
    .exec()
  return partner?.toObject()
}

export const suspend = async (id: string, suspend: boolean) => {
  const user = await Partner.findByIdAndUpdate(id, {
    isSuspended: suspend,
  }).exec()
  return user?.toObject()
}
