import { omitBy, isNil, isNumber, toNumber, escapeRegExp } from 'lodash'
import { subDays } from 'date-fns'
import {
  Edge,
  EdgeFelixVideoTimeline,
  EdgeOwnerToTimelineMedia,
} from '../types/instagramResponse'

/**
 * Parse regex or string from params
 *
 * @param str Object to parse
 * @returns Regular expression or string
 *
 */
export const parseRegex = (str: any) => {
  if (str === undefined) return undefined
  // if the object is a string
  if (isString(str)) return String(str)
  // if its a literal object
  // TODO (VERY IMPORTANT): check if regex is optimized, avoid ReDos and catastrophic backtracking.
  if (str.regex !== undefined && isString(str.regex)) {
    try {
      return new RegExp(str.regex)
    } catch (err: unknown) {
      return undefined
    }
  }
  if (str.string !== undefined && isString(str.string)) {
    return str.string
  }
}

/**
 * Parses boolean from param, only accept literal boolean or 0 and one
 * @param str String to be parsed
 * @returns Boolean value or undefined incase its not defined
 */
export const parseBoolean: (object: any) => boolean | undefined = (
  str: any
) => {
  if (!isString(str)) return undefined
  switch (str) {
    case 'false':
    case '0':
      return false
    case 'true':
    case '1':
      return true

    default:
      return undefined
  }
}

export const parseDate = (object: any) => {
  if (object === undefined) return undefined

  // if the param is a string, return the current date
  if (isString(object)) {
    const date = new Date(object)
    return isValidDate(date) ? date : undefined
  }

  const dateOptions = object as {
    [field: string]: string
  }
  const parsedDateOptions = {} as {
    [field: string]: Date | undefined
  }

  Object.keys(dateOptions).forEach((field) => {
    const date = new Date(dateOptions[field])
    parsedDateOptions[field] = isValidDate(date) ? date : undefined
  })

  return cleanObject(
    parsedDateOptions as {
      [field: string]: Date
    }
  )
}

export type SearchRegex = { $regex: RegExp; $options: string }

export const parseSearch = (object: any): SearchRegex | undefined => {
  if (object === undefined) return undefined
  if (!isString(object)) return undefined
  const search = escapeRegExp(object)

  return { $regex: new RegExp(search), $options: 'i' }
}

export const generateSearch = (searchFields: string[], search: SearchRegex) => {
  const fields: { [field: string]: SearchRegex }[] = []
  searchFields.forEach((field) => {
    fields.push({ [field]: search })
  })
  return fields
}

export const parseNumber = (object: any) => {
  if (object === undefined) return undefined
  const number = Number.parseFloat(object)

  // if the param is a string, return the current date
  if (!isNaN(number) && isNumber(number)) {
    return isFinite(number) ? number : undefined
  }

  const numberOptions = object as {
    [field: string]: string
  }

  const parsedNumberOptions = {} as {
    [field: string]: number | undefined
  }

  Object.keys(numberOptions).forEach((field) => {
    const date = Number.parseInt(numberOptions[field])
    parsedNumberOptions[field] = isFinite(date) ? date : undefined
  })

  return cleanObject(
    parsedNumberOptions as {
      [field: string]: number
    }
  )
}

/**
 * Check if param is string
 * @param value value
 * @returns true if value is string, otherwise false
 */
export const isString = (value: any) =>
  typeof value === 'string' || value instanceof String

/**
 * Check if param is a valid date
 * @param value value
 * @returns true if value is a valid date, otherwise false
 */
export const isValidDate = (value: any) =>
  value instanceof Date && !isNaN(value.getTime())

export const cleanObject = <T>(object: T) => omitBy(object, isNil) as T

export enum DateInterval {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  any = 'any',
}
export const getStartDate = (interval: DateInterval) => {
  switch (interval) {
    case DateInterval.day:
      return subDays(new Date(), 1)
    case DateInterval.week:
      return subDays(new Date(), 7)
    case DateInterval.month:
      return subDays(new Date(), 30)
    case DateInterval.year:
      return subDays(new Date(), 356)
    case DateInterval.any:
    default:
      return new Date(0)
  }
}

export const getFloorByInterval = (interval: DateInterval) => {
  switch (interval) {
    case DateInterval.day:
      return (date: Date) =>
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          0,
          0,
          0
        ).getTime()

    case DateInterval.week:
    case DateInterval.month:
      return (date: Date) =>
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,
          0,
          0,
          0
        ).getTime()
    case DateInterval.year:
    case DateInterval.any:
    default:
      return (date: Date) =>
        new Date(date.getFullYear(), date.getMonth(), 0, 0, 0, 0, 0).getTime()
  }
}

export const segmentTimeSeries = (
  series: Date[],
  interval: DateInterval,
  values?: number[]
) => {
  const floor = getFloorByInterval(interval)
  const ranges: { [key: number]: number } = {}
  for (let i = 0; i < series.length; i++) {
    const range = floor(series[i])
    const currentCount = ranges[range]
    const valueToAdd = values ? values[i] : 1
    ranges[range] =
      currentCount === undefined ? valueToAdd : currentCount + valueToAdd
  }

  return Object.entries(ranges)
}

export const parseInterval = (interval: any) => {
  const parsedInterval = (interval === undefined
    ? DateInterval.any
    : interval.toString()) as DateInterval
  return parsedInterval
}

export const getAverageLikes = (
  data: EdgeFelixVideoTimeline | EdgeOwnerToTimelineMedia
) => {
  const allLikes = (data.edges as Edge[]).map((edge) => {
    return edge.node.edge_liked_by.count
  })

  if (!allLikes) return 0

  return allLikes.reduce((a, b) => a + b) / allLikes.length
}

export const getAverageComments = (
  data: EdgeFelixVideoTimeline | EdgeOwnerToTimelineMedia
) => {
  const allComments = (data.edges as Edge[]).map((edge) => {
    return edge.node.edge_media_to_comment.count
  })

  if (!allComments) return 0

  return allComments.reduce((a, b) => a + b) / allComments.length
}
