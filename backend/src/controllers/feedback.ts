import { Request, Response, NextFunction } from 'express'
import { FeedbackServices } from '../services'
import { BadRequestError, NotFoundError } from '../utils/errors'
import { FeedbackValidator, PaginationValidator } from '../validators'

export const getAll = async (req: Request, res: Response) => {
  const filters = FeedbackValidator.getFilters(req)
  const options = PaginationValidator.getOptions(req)
  const feedbacks = await FeedbackServices.findAll(filters, options)

  res.status(200).json(feedbacks)
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const feedbackId = req.params.id.toString()
  try {
    const feedback = await FeedbackServices.findOne(feedbackId)
    if (!feedback) throw new Error('Not Found.')
    res.status(200).json(feedback)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return next(new BadRequestError('Request missing id.'))
  }
  const feedbackId = req.params.id.toString()
  try {
    const feedback = await FeedbackServices.deleteOne(feedbackId)
    if (!feedback) throw new Error('Not Found.')
    res.status(200).json(feedback)
  } catch (error: unknown) {
    return next(new NotFoundError(error as Error))
  }
}
