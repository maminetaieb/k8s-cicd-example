import { createGetAllRequest, createGetOneRequest } from '../utils'

export const getAll = async (params) => {
  return createGetAllRequest('/orders', params)
}

export const getOne = async ({ _id }) => {
  return createGetOneRequest('/orders', { _id })
}
