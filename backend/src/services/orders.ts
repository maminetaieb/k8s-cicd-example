import { Order } from '../models/shared'
import { OrdersValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: OrdersValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const orders = await Order.paginate(filters, {
    sort,
    page,
    limit,
    lean: true,
  })

  return orders
}

export const findOne = async (id: string) => {
  const order = await Order.findOne({ _id: id })
    .populate([
      'partner',
      'client',
      'foodItems.product',
      'items.product',
      'deliveryOrder',
      'city',
      'region',
    ])
    .exec()
  return order?.toObject()
}
