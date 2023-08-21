import { createGetAllRequest, createGetOneRequest } from '../utils'

export const getAll = async (params) => {
  return createGetAllRequest('/products', params)
}

export const getOne = async ({ _id }) => {
  return createGetOneRequest('/products', { _id })
}
