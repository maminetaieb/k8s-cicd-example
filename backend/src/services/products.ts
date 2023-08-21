import { Product } from '../models/shared'
import { ProductsValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: ProductsValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const products = await Product.paginate(filters, {
    sort,
    page,
    limit,
    lean: true,
  })

  return products
}

export const findOne = async (id: string) => {
  const product = await Product.findOne({ _id: id })
    .populate([
      {
        path: 'partner',
        model: 'Partner',
      },
      {
        path: 'variants',
      },
    ])
    .exec()
  return product?.toObject()
}
