import { api } from '../config'
import { createGetAllRequest, createGetOneRequest } from '../utils'

export const getAll = async (params) => {
  return createGetAllRequest('/users', params)
}

export const getOne = async ({ _id }) => {
  return createGetOneRequest('/users', { _id })
}

export const locateOne = async ({ locationCode }) => {
  return createGetOneRequest('/locate', { _id: locationCode })
}

export const suspend = async ({ _id, value }) => {
  const response = await api.axios.post(`/users/${_id}/suspend`, {
    value: !!value,
  })
  return response?.data
}
