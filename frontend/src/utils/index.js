import { api } from '../config'

export const omitNullOrDefaults = (object, defaults) => {
  const cleanObject = {}
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (value === undefined || value === null || value === '') return
    if (value === defaults[key]) return

    cleanObject[key] = value
  })

  return cleanObject
}

export const isString = (value) =>
  typeof value === 'string' || value instanceof String

export const getLocationHref = (latitude, longitude) => {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
}

export const createGetAllRequest = async (
  url,
  { pageIndex, pageSize, sortBy, search, filters }
) => {
  const sort = {}
  sortBy?.forEach((c) => {
    sort[c.id] = c.desc ? -1 : 1
  })
  const response = await api.axios.get(url, {
    params: {
      page: pageIndex,
      limit: pageSize,
      sort: sort,
      search,
      ...filters,
    },
  })
  if (!response) throw new Error(`Request failed`)

  return response.data
}

export const createGetOneRequest = async (url, { _id }) => {
  const response = await api.axios.get(`${url}/${_id}`)
  if (!response) throw new Error(`Request failed`)
  return response.data
}
