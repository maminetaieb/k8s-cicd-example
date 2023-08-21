import { useQuery } from 'react-query'
import { AnalyticsServices } from '../services'

export const usePartnersLocations = () => {
  const query = useQuery('partner-locations', () =>
    AnalyticsServices.partnersLocations()
  )
  return query
}

export const useUsersLocations = () => {
  const query = useQuery('user-locations', () =>
    AnalyticsServices.usersLocations()
  )
  return query
}

export const usePartnersSales = ({ since }) => {
  const query = useQuery(['partner-sales', since], () =>
    AnalyticsServices.partnersSales({ since })
  )
  return query
}

export const usePartnersViews = ({ since }) => {
  const query = useQuery(['partner-views', since], () =>
    AnalyticsServices.partnersViews({ since })
  )
  return query
}

export const useOrdersDates = ({ since }) => {
  const query = useQuery(['orders-dates', since], () =>
    AnalyticsServices.ordersDates({ since })
  )
  return query
}

export const useOrdersByType = ({ since }) => {
  const query = useQuery(['orders-type', since], () =>
    AnalyticsServices.ordersByType({ since })
  )
  return query
}

export const useProductsByType = ({ since }) => {
  const query = useQuery(['products-type', since], () =>
    AnalyticsServices.productsByType({ since })
  )
  return query
}

export const useOrders = () => {
  const query = useQuery('analytics-orders', () => AnalyticsServices.orders())
  return query
}

export const usePartners = () => {
  const query = useQuery('analytics-partners', () =>
    AnalyticsServices.partners()
  )
  return query
}

export const useUsers = () => {
  const query = useQuery('analytics-users', () => AnalyticsServices.users())
  return query
}

export const useProducts = () => {
  const query = useQuery('analytics-products', () =>
    AnalyticsServices.products()
  )
  return query
}

export const useFinance = () => {
  const query = useQuery('analytics-finance', () => AnalyticsServices.finance())
  return query
}

export const useFinancialIncomeByDate = ({ since }) => {
  const query = useQuery(['finance-income-date', since], () =>
    AnalyticsServices.financialIncomeByDate({ since })
  )
  return query
}

export const useFinancialIncomeByRegion = ({ since }) => {
  const query = useQuery(['finance-income-region', since], () =>
    AnalyticsServices.financialIncomeByRegion({ since })
  )
  return query
}

export const useFinancialProfitByDate = ({ since }) => {
  const query = useQuery(['finance-profit-date', since], () =>
    AnalyticsServices.financialProfitByDate({ since })
  )
  return query
}

export const useFinancialProfitByRegion = ({ since }) => {
  const query = useQuery(['finance-profit-region', since], () =>
    AnalyticsServices.financialProfitByRegion({ since })
  )
  return query
}

export const useSinglePartnerViews = ({ id, since }) => {
  const query = useQuery(['partner-single-views', id, since], () =>
    AnalyticsServices.partnerViews({ id, since })
  )
  return query
}

export const useSinglePartnerSales = ({ id, since }) => {
  const query = useQuery(['partner-single-sales', id, since], () =>
    AnalyticsServices.partnerSales({ id, since })
  )
  return query
}

export const useInstagram = () => {
  const query = useQuery('instagram', () => AnalyticsServices.instagram(), {
    staleTime: 1000 * 60 * 60,
  })
  return query
}
