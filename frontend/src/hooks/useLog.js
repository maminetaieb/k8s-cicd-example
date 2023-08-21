import { useInfiniteQuery } from 'react-query'
import { LogServices } from '../services'

export const useLog = ({ pageSize, sortBy, searchFilter }) => {
  const query = useInfiniteQuery(
    ['log', pageSize, sortBy, searchFilter],
    async ({ pageParam = 0 }) => {
      const data = await LogServices.getAll({
        pageIndex: pageParam + 1,
        pageSize,
        sortBy,
        search: searchFilter,
      })
      return data
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.nextPage ? lastPage.nextPage - 1 : false,
      keepPreviousData: true,
    }
  )
  return query
}
