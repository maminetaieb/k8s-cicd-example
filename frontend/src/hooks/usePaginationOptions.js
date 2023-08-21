import { useState } from 'react'

export const usePaginationOptions = () => {
  const [{ pageIndex, pageSize, sortBy }, setPaginationOptions] = useState({
    pageIndex: 1,
    pageSize: 10,
    sortBy: undefined,
  })

  return { pageIndex, pageSize, sortBy, setPaginationOptions }
}
