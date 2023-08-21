import create from 'zustand'
import { api } from '../config'
import { AuthServices } from '../services'

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  loggedIn: false,
  loading: false,
  fetchingToken: false,
  requestInterceptor: null,
  responseInterceptor: null,
  loginMessage: undefined,
  initInterceptors: () => {
    const requestInterceptor = api.axios.interceptors.request.use(
      async (config) => {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken)
          get().logout({
            reason: 'Your session expired, please log back in.',
          })

        const access = get().accessToken
        config.headers = {
          Authorization: `Bearer ${access}`,
        }
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )
    set({ requestInterceptor })
    const createResponseInterceptor = () => {
      const responseInterceptor = api.axios.interceptors.response.use(
        (response) => {
          return response
        },
        async (error) => {
          if (error.response.status !== 401) return Promise.reject(error)

          api.axios.interceptors.response.eject(responseInterceptor)
          const refreshToken = localStorage.getItem('refreshToken')
          try {
            const { access } = await AuthServices.refresh({ refreshToken })
            set({ accessToken: access })
            return api.axios(error.response.config)
          } catch (err) {
            get().logout({
              reason: 'Your session expired, please log back in.',
            })
          } finally {
            createResponseInterceptor()
          }
        }
      )
      set({ responseInterceptor })
    }
    createResponseInterceptor()
  },

  fetchRefreshToken: async () => {
    set({ fetchingToken: true })
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      set({ loggedIn: false })
      set({ fetchingToken: false })
      return
    }
    try {
      const { access } = await AuthServices.refresh({ refreshToken })
      set({ accessToken: access })
      set({ loggedIn: true })
      get().initInterceptors()
    } catch (err) {
      localStorage.removeItem('refreshToken')
      set({ loggedIn: false })
    } finally {
      set({ fetchingToken: false })
    }
  },

  login: async ({ username, password }) => {
    set({ loading: true })
    try {
      const { access, refresh } = await AuthServices.login({
        username,
        password,
      })

      set({ loggedIn: true, loading: false, accessToken: access })
      localStorage.setItem('refreshToken', refresh)
      get().initInterceptors()
      return null
    } catch (error) {
      set({ loggedIn: false, loading: false })
      return (
        error.response?.data?.error ||
        error.request?.data?.error ||
        error.message
      )
    }
  },
  logout: ({ reason = undefined }) => {
    const requestInterceptor = get().requestInterceptor
    const responseInterceptor = get().responseInterceptor

    if (requestInterceptor !== null) {
      api.axios.interceptors.request.eject(requestInterceptor)
    }
    if (responseInterceptor !== null) {
      api.axios.interceptors.request.eject(responseInterceptor)
    }
    localStorage.removeItem('refreshToken')
    localStorage.clear()

    set({
      loggedIn: false,
      requestInterceptor: null,
      responseInterceptor: null,
      loginMessage: reason,
    })
  },
}))
