import { Request } from 'express'
import {
  cleanObject,
  generateSearch,
  isString,
  parseBoolean,
  parseRegex,
  parseSearch,
  SearchRegex,
} from '../utils'

export type filters = {
  name?: { en?: string | RegExp; fr?: string | RegExp }
  type?: 'shopping' | 'food' | 'service'
  status?: boolean
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['name']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  if (req.query.name !== undefined) {
    conditions.name = isString(req.query.name)
      ? { fr: parseRegex(req.query.name) }
      : (conditions.name = {
          en: parseRegex((req.query.name as any).en),
          fr: parseRegex((req.query.name as any).fr),
        })
  }

  if (req.query.type !== undefined) {
    const type = String(req.query.type)
    if (['shopping', 'food', 'service'].includes(type)) {
      conditions.type = type as 'shopping' | 'food' | 'service'
    }
  }

  conditions.status = parseBoolean(req.query.status)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
