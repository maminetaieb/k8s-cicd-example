import express, { Request, Response } from 'express'
import { AnalyticsController } from '../controllers'

import apicache from 'apicache'

const AnalyticsRouter = express.Router()

const cache = apicache.middleware
const onlyStatus200 = (req: Request, res: Response) => res.statusCode === 200
const cacheSuccesses = cache('2 days', onlyStatus200)

/**
 * Partners
 */
AnalyticsRouter.get(
  '/partners',
  cache('10 minutes'),
  AnalyticsController.getPartners
)
AnalyticsRouter.get('/partners/views', AnalyticsController.getPartnersViews)
AnalyticsRouter.get('/partners/sales', AnalyticsController.getPartnersSales)
AnalyticsRouter.get(
  '/partners/locations',
  AnalyticsController.getPartnersLocations
)

/**
 * Orders
 */
AnalyticsRouter.get(
  '/orders',
  cache('10 minutes'),
  AnalyticsController.getOrders
)
AnalyticsRouter.get('/orders/type', AnalyticsController.getOrdersByType)
AnalyticsRouter.get('/orders/date', AnalyticsController.getOrdersDates)

/**
 * Users
 */
AnalyticsRouter.get('/users', cache('10 minutes'), AnalyticsController.getUsers)
AnalyticsRouter.get('/users/locations', AnalyticsController.getUsersLocations)

/**
 * Products
 */
AnalyticsRouter.get(
  '/products',
  cache('10 minutes'),
  AnalyticsController.getProducts
)
AnalyticsRouter.get('/products/type', AnalyticsController.getProductsByType)

/**
 * Finance
 */
AnalyticsRouter.get(
  '/finance',
  cache('10 minutes'),
  AnalyticsController.getFinance
)
AnalyticsRouter.get(
  '/finance/income/date',
  AnalyticsController.getFinancialIncomeByDate
)
AnalyticsRouter.get(
  '/finance/profit/date',
  AnalyticsController.getFinancialProfitByDate
)
AnalyticsRouter.get(
  '/finance/income/region',
  AnalyticsController.getFinancialIncomeByRegion
)
AnalyticsRouter.get(
  '/finance/profit/region',
  AnalyticsController.getFinancialProfitByRegion
)

/**
 * Social Media
 */
AnalyticsRouter.get(
  '/instagram',
  cacheSuccesses,
  AnalyticsController.getInstagram
)

export { AnalyticsRouter }
