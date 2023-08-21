import { Request } from 'express'
import {
  parseRegex,
  parseNumber,
  parseDate,
  parseBoolean,
  cleanObject,
  parseSearch,
  generateSearch,
  SearchRegex,
} from '../utils'

export type filters = {
  name?: string | RegExp
  basePrice?: { [field: string]: number } | number
  discount?: { [field: string]: number } | number
  description?: string | RegExp
  shortDescription?: string | RegExp
  date?: Date | { [field: string]: Date }
  isActive?: boolean
  type?: string
  gender?: string
  weight?: { [field: string]: number } | number
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['name', 'description', 'shortDescription']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.name = parseRegex(req.query.name)
  conditions.basePrice = parseNumber(req.query.basePrice)
  conditions.discount = parseNumber(req.query.discount)
  conditions.description = parseRegex(req.query.description)
  conditions.shortDescription = parseRegex(req.query.shortDescription)
  conditions.date = parseDate(req.query.date)
  conditions.isActive = parseBoolean(req.query.isActive)
  conditions.type = parseRegex(req.query.type)
  conditions.gender = parseRegex(req.query.gender)
  conditions.weight = parseNumber(req.query.weight)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
