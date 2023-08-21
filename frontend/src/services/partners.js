import { api } from '../config'
import { createGetAllRequest, createGetOneRequest } from '../utils'

export const getAll = async (params) => {
  return createGetAllRequest('/partners', params)
}

export const getOne = async ({ _id }) => {
  return createGetOneRequest('/partners', { _id })
}

export const suspend = async ({ _id, value }) => {
  const response = await api.axios.post(`/partners/${_id}/suspend`, {
    value: !!value,
  })
  return response?.data
}
