import { Domain } from '../models/shared'
import { DomainsValidator, PaginationValidator } from '../validators'

export const findAll = async (
  filters: DomainsValidator.filters,
  { sort, page = 1, limit = 10 }: PaginationValidator.options
) => {
  //@ts-ignore
  const domains = await Domain.paginate(filters, {
    sort,
    page,
    limit,
    lean: true,
  })

  return domains
}

export const findOne = async (id: string) => {
  const domain = await Domain.findOne({ _id: id }).exec()
  return domain?.toObject()
}
