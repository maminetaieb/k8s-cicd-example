import { api } from '../config'

export const usersLocations = async () => {
  const response = await api.axios.get('/analytics/users/locations')
  return response?.data
}

export const partnersLocations = async () => {
  const response = await api.axios.get('/analytics/partners/locations')
  return response?.data
}

export const partnersViews = async ({ since }) => {
  const response = await api.axios.get('/analytics/partners/views', {
    params: {
      since,
    },
  })
  return response?.data
}

export const partnersSales = async ({ since }) => {
  const response = await api.axios.get('/analytics/partners/sales', {
    params: {
      since,
    },
  })
  return response?.data
}

export const ordersDates = async ({ since }) => {
  const response = await api.axios.get('/analytics/orders/date', {
    params: {
      since,
    },
  })
  return response?.data
}

export const ordersByType = async ({ since }) => {
  const response = await api.axios.get('/analytics/orders/type', {
    params: {
      since,
    },
  })
  return response?.data
}

export const productsByType = async ({ since }) => {
  const response = await api.axios.get('/analytics/products/type', {
    params: {
      since,
    },
  })
  return response?.data
}

// Finance //
export const financialIncomeByDate = async ({ since }) => {
  const response = await api.axios.get('/analytics/finance/income/date', {
    params: {
      since,
    },
  })
  return response?.data
}

export const financialIncomeByRegion = async ({ since }) => {
  const response = await api.axios.get('/analytics/finance/income/region', {
    params: {
      since,
    },
  })
  return response?.data
}

export const financialProfitByDate = async ({ since }) => {
  const response = await api.axios.get('/analytics/finance/profit/date', {
    params: {
      since,
    },
  })
  return response?.data
}

export const financialProfitByRegion = async ({ since }) => {
  const response = await api.axios.get('/analytics/finance/profit/region', {
    params: {
      since,
    },
  })
  return response?.data
}

export const partnerViews = async ({ id, since }) => {
  const response = await api.axios.get(`/partners/${id}/views`, {
    params: {
      since,
    },
  })
  return response?.data
}

export const partnerSales = async ({ id, since }) => {
  const response = await api.axios.get(`/partners/${id}/sales`, {
    params: {
      since,
    },
  })
  return response?.data
}

export const instagram = async () => {
  const response = await api.axios.get('/analytics/instagram')
  return response?.data
}

// general analytics //
export const orders = async () => {
  const response = await api.axios.get('/analytics/orders')
  return response?.data
}

export const partners = async () => {
  const response = await api.axios.get('/analytics/partners')
  return response?.data
}

export const users = async () => {
  const response = await api.axios.get('/analytics/users')
  return response?.data
}

export const products = async () => {
  const response = await api.axios.get('/analytics/products')
  return response?.data
}

export const finance = async () => {
  const response = await api.axios.get('/analytics/finance')
  return response?.data
}
