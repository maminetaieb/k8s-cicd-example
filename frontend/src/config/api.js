import axios from 'axios'
import qs from 'qs'

const BASE_HOST_URL = process.env.NODE_ENV === 'production' ? 'https://addresti-dashboard-backend.herokuapp.com/' : 'http://localhost:8000'

const api = {
  host: BASE_HOST_URL,
  axios: axios.create({
    baseURL: BASE_HOST_URL,
    paramsSerializer: (params) => {
      return qs.stringify(params)
    },
  }),
}

export default api
