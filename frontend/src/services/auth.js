import { api } from '../config'

export const login = async ({ username, password }) => {
  const response = await api.axios.post('/auth/login', {
    username,
    password,
  })

  return response.data
}

export const refresh = async ({ refreshToken }) => {
  const response = await api.axios.post('/auth/refresh', {
    refresh: refreshToken,
  })
  return response.data
}

export const logout = async ({ refreshToken }) => {
  const response = await api.axios.post('/auth/revoke', {
    refreshToken,
  })
  return response.data
}

export const me = async () => {
  const response = await api.axios.get('/auth/me')
  return response.data
}

export const updateDisplayName = async ({ displayName }) => {
  const response = await api.axios.put('/auth/me', { displayName })
  return response?.data
}

export const updatePassword = async ({ oldPassword, newPassword }) => {
  const response = await api.axios.put('/auth/password', {
    oldPassword,
    newPassword,
  })
  return response?.data
}

export const getSessions = async () => {
  const response = await api.axios.get('/auth/tokens')
  return response?.data
}

export const revokeSession = async ({ token }) => {
  const response = await api.axios.delete(`/auth/tokens/${token}`)
  return response?.data
}

export const revokeAllSessions = async () => {
  const response = await api.axios.delete('/auth/tokens')
  return response?.data
}
