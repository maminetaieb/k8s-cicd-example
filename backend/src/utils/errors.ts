/**
 * TODO: get rid of these errors, use library like http-errors to create errors
 * https://zellwk.com/blog/express-errors/
 */

import { NextFunction, Request, Response } from 'express'

export class BadRequestError extends Error {
  data: Error | null
  statusCode: number

  constructor(error: Error | string) {
    super(error instanceof Error ? error.message : error)

    this.data = error instanceof Error ? error : null
    this.statusCode = 400
  }
}

export class NotFoundError extends Error {
  data: Error
  statusCode: number

  constructor(error: Error) {
    super(error.message)

    this.data = error
    this.statusCode = 404
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof NotFoundError || error instanceof BadRequestError)
    res.status(error.statusCode)
  else res.status(400)

  res.json({ message: error.message })
}
