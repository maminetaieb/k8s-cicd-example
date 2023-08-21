import { User } from '../models/shared'
import { UsersValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: UsersValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const users = await User.paginate(filters, {
    populate: 'location',
    sort,
    page,
    limit,
    lean: true,
  })
  return users
}

export const findOne = async (id: string) => {
  const user = await User.findOne({ _id: id })
    .populate(['partners', 'location'])
    .exec()
  return user?.toObject()
}

export const suspend = async (id: string, suspend: boolean) => {
  const user = await User.findByIdAndUpdate(id, { isSuspended: suspend }).exec()
  return user?.toObject()
}
