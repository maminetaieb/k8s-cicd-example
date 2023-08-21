import { Request } from 'express'
import {
  parseBoolean,
  parseNumber,
  parseRegex,
  parseDate,
  cleanObject,
  parseSearch,
  generateSearch,
  SearchRegex,
} from '../utils'

/**
 * Extract the filters from the request.
 */

export type filters = {
  description?: string | RegExp
  rating?: { [field: string]: number } | number
  partnerName?: string | RegExp
  website?: string | RegExp
  instagram?: string | RegExp
  isDeliveryDistantPartner?: boolean
  isDeliveryLocalPartner?: boolean
  youtube?: string | RegExp
  facebook?: string | RegExp
  patentent?: string | RegExp
  returnRules?: string | RegExp
  email?: string | RegExp
  rules?: string | RegExp
  phone?: string | RegExp
  holiday?: boolean
  joined?: { [field: string]: Date } | Date
  percentage?: { [field: string]: number } | number
  confirmed?: boolean
  isSuspended?: boolean
  $or?: { [field: string]: SearchRegex | string }[]
}

const searchFields = [
  'description',
  'partnerName',
  'website',
  'instagram',
  'youtube',
  'facebook',
  'patentent',
  'returnRules',
  'email',
  'phone',
]

export const getFilters = (req: Request) => {
  const conditions: filters = {}

  conditions.description = parseRegex(req.query.description)
  conditions.rating = parseNumber(req.query.rating)
  conditions.partnerName = parseRegex(req.query.partnerName)
  conditions.website = parseRegex(req.query.website)
  conditions.instagram = parseRegex(req.query.instagram)

  conditions.isDeliveryDistantPartner = parseBoolean(
    req.query.isDeliveryDistantPartner
  )
  conditions.isDeliveryLocalPartner = parseBoolean(
    req.query.isDeliveryLocalPartner
  )

  conditions.youtube = parseRegex(req.query.youtube)
  conditions.facebook = parseRegex(req.query.facebook)
  conditions.patentent = parseRegex(req.query.patentent)
  conditions.returnRules = parseRegex(req.query.returnRules)
  conditions.email = parseRegex(req.query.email)

  conditions.rules = parseRegex(req.query.rules)
  conditions.phone = parseRegex(req.query.phone)
  conditions.holiday = parseBoolean(req.query.holiday)

  conditions.joined = parseDate(req.query.joined)
  conditions.percentage = parseNumber(req.query.percentage)
  conditions.confirmed = parseBoolean(req.query.confirmed)
  conditions.isSuspended = parseBoolean(req.query.isSuspended)

  const search = parseSearch(req.query.search)
  conditions.$or = search ? generateSearch(searchFields, search) : undefined

  return cleanObject(conditions)
}
