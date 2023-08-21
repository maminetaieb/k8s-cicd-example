import { Request } from 'express'
import {
  cleanObject,
  generateSearch,
  isString,
  parseBoolean,
  parseDate,
  parseRegex,
  parseSearch,
  SearchRegex,
} from '../utils'

/**
 * Extract the filters from the request.
 */

export type filters = {
  username?: string | RegExp
  firstName?: string | RegExp
  lastName?: string | RegExp
  email?: string | RegExp
  phone?: string | RegExp
  joined?: { [field: string]: Date } | Date
  isPartner?: boolean
  confirmed?: boolean
  isVendor?: boolean
  isSuspended?: boolean
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = ['username', 'firstName', 'lastName', 'email', 'phone']

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.username = parseRegex(req.query.username)
  conditions.firstName = parseRegex(req.query.firstName)
  conditions.lastName = parseRegex(req.query.lastName)
  conditions.email = parseRegex(req.query.email)
  conditions.phone = parseRegex(req.query.phone)
  conditions.joined = parseDate(req.query.joined)
  conditions.isPartner = parseBoolean(req.query.isPartner)
  conditions.confirmed = parseBoolean(req.query.confirmed)
  conditions.isVendor = parseBoolean(req.query.isVendor)
  conditions.isSuspended = parseBoolean(req.query.isSuspended)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
