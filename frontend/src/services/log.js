import { createGetAllRequest } from '../utils'

export const getAll = async (params) => {
  return createGetAllRequest('/log', params)
}
