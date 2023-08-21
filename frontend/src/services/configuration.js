import { api } from '../config'

export const get = async () => {
  const response = await api.axios.get('/configuration')
  return response.data
}

export const update = async ({ instagramId, googleKey }) => {
  const response = await api.axios.put('/configuration', {
    instagramId,
    googleKey,
  })
  return response.data
}
