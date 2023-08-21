import { api } from '../config'
import { createGetAllRequest, createGetOneRequest } from '../utils'

export const getAll = async (params) => {
  return createGetAllRequest('/feedback', params)
}

export const getOne = async ({ _id }) => {
  return createGetOneRequest('/feedback', { _id })
}

export const deleteOne = async ({ _id }) => {
  const response = await api.axios.delete(`/feedback/${_id}`)
  return response?.data
}
