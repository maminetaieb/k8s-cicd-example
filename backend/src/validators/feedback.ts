import { Request } from 'express'
import {
  cleanObject,
  generateSearch,
  parseDate,
  parseNumber,
  parseRegex,
  parseSearch,
  SearchRegex,
} from '../utils'

export type filters = {
  score?: { [field: string]: number } | number
  comment?: string | RegExp
  date?: { [field: string]: Date } | Date
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['comment']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.score = parseNumber(req.query.score)

  conditions.comment = parseRegex(req.query.comment)

  conditions.date = parseDate(req.query.date)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
