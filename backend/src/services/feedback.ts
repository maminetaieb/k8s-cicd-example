import { Feedback } from '../models/shared'
import { FeedbackValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: FeedbackValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const feedbacks = await Feedback.paginate(filters, {
    populate: ['partner', 'user'],
    sort,
    page,
    limit,
    lean: true,
  })

  return feedbacks
}

export const findOne = async (id: string) => {
  const feedback = await Feedback.findOne({ _id: id })
    .populate(['partner', 'user', 'deliverer'])
    .exec()
  return feedback?.toObject()
}

export const deleteOne = async (id: string) => {
  const feedback = await Feedback.deleteOne({ _id: id })
  return feedback.ok
}
