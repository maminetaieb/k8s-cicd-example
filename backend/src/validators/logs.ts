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
  user?: string | RegExp
  action?: string | RegExp
  description?: string | RegExp
  createdAt?: Date | { [field: string]: Date }
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['action', 'description']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.user = parseRegex(req.query.user)
  conditions.action = parseRegex(req.query.action)
  conditions.description = parseRegex(req.query.description)
  conditions.createdAt = parseDate(req.query.createdAt)
  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
