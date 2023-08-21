import { DeliveryOrder } from '../models/shared'
import { DeliveryOrdersValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: DeliveryOrdersValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const deliveryOrders = await DeliveryOrder.paginate(filters, {
    sort,
    page,
    limit,
    lean: true,
  })

  return deliveryOrders
}

export const findOne = async (id: string) => {
  const deliveryOrder = await DeliveryOrder.findOne({ _id: id })
    .populate([
      { path: 'client', model: 'User' },
      { path: 'collectDeliverer', model: 'User' },
      { path: 'purchaseOrder', model: 'Order' },
      { path: 'collectCity', model: 'City' },
      { path: 'collectRegion', model: 'Region' },
      { path: 'deliveryCity', model: 'City' },
      { path: 'deliveryRegion', model: 'Region' },
      'partner',
    ])
    .exec()
  return deliveryOrder?.toObject()
}
