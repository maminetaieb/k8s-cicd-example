import { Request } from 'express'
import { isString } from '../utils'

export type options = {
  sort: { [field: string]: -1 | 1 }
  page: number
  limit?: 10 | 20 | 50 | 100
}

export const getOptions = (req: Request) => {
  const options: options = { page: 1, limit: 10, sort: {} }

  if (req.query.limit) {
    const limit = Number.parseInt(req.query.limit as string)
    if ([10, 20, 50, 100].includes(limit)) {
      options.limit = limit as 10 | 20 | 50 | 100
    }
  }

  if (req.query.sort && !isString(req.query.sort)) {
    const sortOptions = (req.query.sort as unknown) as { [field: string]: any }

    Object.keys(sortOptions).forEach((field) => {
      const direction = Number.parseInt(sortOptions[field])
      if ([-1, 1].includes(direction)) {
        options.sort[field] = direction as -1 | 1
      }
    })
  }

  if (req.query.page) {
    const page = Number.parseInt(req.query.page as string)
    options.page = page as number
  }

  return options
}
