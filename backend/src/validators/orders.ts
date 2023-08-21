import { Request } from 'express'
import {
  cleanObject,
  generateSearch,
  isString,
  parseBoolean,
  parseDate,
  parseNumber,
  parseRegex,
  parseSearch,
  SearchRegex,
} from '../utils'

export type filters = {
  actif?: boolean
  taked?: boolean
  prepared?: boolean
  passed?: boolean
  payed?: boolean
  price?: { [field: string]: number } | number
  phone?: string | RegExp
  date?: { [field: string]: Date } | Date
  type?: 'regular' | 'food'
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['phone', 'type']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.actif = parseBoolean(req.query.actif)
  conditions.taked = parseBoolean(req.query.taked)
  conditions.prepared = parseBoolean(req.query.prepared)
  conditions.passed = parseBoolean(req.query.passed)
  conditions.payed = parseBoolean(req.query.payed)
  conditions.price = parseNumber(req.query.price)
  conditions.phone = parseRegex(req.query.phone)
  conditions.date = parseDate(req.query.date)
  conditions.type = parseRegex(req.query.type)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
