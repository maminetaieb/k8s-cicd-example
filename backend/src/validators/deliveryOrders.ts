import { Request } from 'express'
import {
  cleanObject,
  generateSearch,
  parseBoolean,
  parseDate,
  parseNumber,
  parseRegex,
  parseSearch,
  SearchRegex,
} from '../utils'

export type filters = {
  isRatedDeliverer?: boolean
  collectDate?: { [field: string]: Date } | Date
  deliveryDate?: { [field: string]: Date } | Date
  inDeposit?: boolean
  delivered?: boolean
  deliveryStatus?:
    | 'settled'
    | 'during_client_delivery'
    | 'during_collect_delivery'
    | 'during_return_delivery'
  returned?: boolean
  payed?: boolean
  type?: 'local' | 'distant'
  distance?: { [field: string]: number } | number
  status?: 'to_be_picked_up' | 'to_be_delivered' | 'to_be_returned'
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['status', 'type', 'deliveryStatus']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.isRatedDeliverer = parseBoolean(req.query.isRatedDeliverer)
  conditions.inDeposit = parseBoolean(req.query.inDeposit)
  conditions.delivered = parseBoolean(req.query.delivered)
  conditions.returned = parseBoolean(req.query.returned)
  conditions.payed = parseBoolean(req.query.payed)

  conditions.deliveryStatus = parseRegex(req.query.deliveryStatus)
  conditions.type = parseRegex(req.query.type)
  conditions.status = parseRegex(req.query.status)

  conditions.distance = parseNumber(req.query.distance)

  conditions.collectDate = parseDate(req.query.collectDate)
  conditions.deliveryDate = parseDate(req.query.deliveryDate)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
