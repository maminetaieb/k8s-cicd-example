import { createGetAllRequest, createGetOneRequest } from '../utils'

export const getAll = async (params) => {
  return createGetAllRequest('/delivery-orders', params)
}

export const getOne = async ({ _id }) => {
  return createGetOneRequest('/delivery-orders', { _id })
}
