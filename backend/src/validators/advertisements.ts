import { Request } from 'express'
import {
  cleanObject,
  generateSearch,
  parseRegex,
  parseSearch,
  SearchRegex,
} from '../utils'

export type filters = {
  description?: string | RegExp
  link?: string | RegExp
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['description']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.description = parseRegex(req.query.description)
  conditions.link = parseRegex(req.query.link)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
