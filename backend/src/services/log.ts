import { Log, User, UserDocument } from '../models'
import { LogsValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: LogsValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const logs = await Log.paginate(filters, {
    sort,
    page,
    limit,
    populate: 'user',
    lean: true,
  })
  return logs
}

export const add = async ({
  user,
  action,
  description,
}: {
  user: UserDocument
  action: string
  description: string
}) => {
  const log = new Log({
    user,
    action,
    description,
  })

  await log.save()
}
