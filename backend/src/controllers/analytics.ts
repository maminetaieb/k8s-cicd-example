import { Request, Response } from 'express'
import { AnalyticsServices } from '../services'
import { parseInterval } from '../utils'

export const getPartners = async (req: Request, res: Response) => {
  const analytics = await AnalyticsServices.getPartners()

  res.json({ analytics })
}

export const getOrders = async (req: Request, res: Response) => {
  const analytics = await AnalyticsServices.getOrders()

  res.json({ analytics })
}

export const getUsers = async (req: Request, res: Response) => {
  const analytics = await AnalyticsServices.getUsers()

  res.json({ analytics })
}

export const getFinance = async (req: Request, res: Response) => {
  const analytics = await AnalyticsServices.getFinance()

  res.json({ analytics })
}

export const getProducts = async (req: Request, res: Response) => {
  const analytics = await AnalyticsServices.getProducts()

  res.json({ analytics })
}

export const getInstagram = async (req: Request, res: Response) => {
  try {
    const analytics = await AnalyticsServices.getInstagram()
    res.status(200).json({
      analytics,
    })
  } catch (err: unknown) {
    res.status(404).json({
      message:
        'Could not get instagram data, make sure you set an instagram user ID and added instagram sessionid to .env.',
    })
  }
}

export const getPartnersSales = async (req: Request, res: Response) => {
  const interval = parseInterval(req.query.since)
  const sales = await AnalyticsServices.getAllPartnerSales(interval)

  res.json({
    sales,
  })
}

export const getPartnersViews = async (req: Request, res: Response) => {
  const interval = parseInterval(req.query.since)
  const views = await AnalyticsServices.getAllPartnerViews(interval)

  res.json({
    views,
  })
}

export const getPartnersLocations = async (req: Request, res: Response) => {
  const locations = await AnalyticsServices.getPartnerLocations()
  res.json({
    locations,
  })
}

export const getUsersLocations = async (req: Request, res: Response) => {
  const locations = await AnalyticsServices.getUserLocations()
  res.json({
    locations,
  })
}

export const getOrdersDates = async (req: Request, res: Response) => {
  const interval = parseInterval(req.query.since)
  const orders = await AnalyticsServices.getAllOrdersDates(interval)

  res.json({
    orders,
  })
}

export const getOrdersByType = async (req: Request, res: Response) => {
  const interval = parseInterval(req.query.since)
  const orders = await AnalyticsServices.getOrdersByType(interval)

  res.json({
    orders,
  })
}

export const getProductsByType = async (req: Request, res: Response) => {
  const interval = parseInterval(req.query.since)
  const products = await AnalyticsServices.getProductsByType(interval)

  res.json({
    products,
  })
}

export const getFinancialIncomeByDate = async (req: Request, res: Response) => {
  const interval = parseInterval(req.query.since)
  const income = await AnalyticsServices.getTotalIncomeByDate(interval)

  res.json({
    income,
  })
}

export const getFinancialIncomeByRegion = async (
  req: Request,
  res: Response
) => {
  const interval = parseInterval(req.query.since)
  const income = await AnalyticsServices.getTotalIncomeByRegion(interval)

  res.json({
    income,
  })
}

export const getFinancialProfitByDate = async (req: Request, res: Response) => {
  const interval = parseInterval(req.query.since)
  const profit = await AnalyticsServices.getTotalProfitByDate(interval)

  res.json({
    profit,
  })
}

export const getFinancialProfitByRegion = async (
  req: Request,
  res: Response
) => {
  const interval = parseInterval(req.query.since)
  const profit = await AnalyticsServices.getTotalProfitByRegion(interval)

  res.json({
    profit,
  })
}
