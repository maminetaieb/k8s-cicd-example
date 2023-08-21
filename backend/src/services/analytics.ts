import { Partner, User, Location, Order, Product } from '../models/shared'
import { Types } from 'mongoose'
import {
  DateInterval,
  getAverageComments,
  getAverageLikes,
  getStartDate,
  segmentTimeSeries,
} from '../utils'
import { subDays } from 'date-fns'
import { Configuration } from '../models'
import { NotFoundError } from '../utils/errors'
import { InstagramResponse } from '../types'

import axios from 'axios'

export const getPartnerLocations = async () => {
  const locations = await Partner.find(
    { localisation: { $exists: true } },
    { localisation: 1, _id: 0 }
  ).exec()
  return locations
}

export const getUserLocations = async () => {
  const locations = await Location.find({}, { location: 1, _id: 0 }).exec()
  return locations
}

export const getAllPartnerViews = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const partnerViews = (await Partner.aggregate([
    { $unwind: '$views' },
    { $match: { views: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        views: { $push: '$views' },
      },
    },
    { $project: { views: '$views', _id: 0 } },
  ])) as { views: Date[] }[]

  const views: Date[] = []

  partnerViews.forEach((value) => {
    views.push(...value.views)
  })

  const segmentedViews = segmentTimeSeries(views, interval)

  return segmentedViews
}

export const getAllOrdersDates = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const ordersDates = (await Order.aggregate([
    { $match: { date: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        orders: { $push: '$date' },
      },
    },
    { $project: { orders: '$orders', _id: 0 } },
  ])) as { orders: Date[] }[]

  const orders: Date[] = []

  ordersDates.forEach((value) => {
    orders.push(...value.orders)
  })

  const segmentedOrders = segmentTimeSeries(orders, interval)

  return segmentedOrders
}

export const getAllPartnerSales = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const partnerSales = (await Partner.aggregate([
    { $unwind: '$itemsPurchased' },
    { $match: { itemsPurchased: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        itemsPurchased: { $push: '$itemsPurchased' },
      },
    },
    { $project: { sales: '$itemsPurchased', _id: 0 } },
  ])) as { sales: Date[] }[]

  const sales: Date[] = []

  partnerSales.forEach((value) => {
    sales.push(...value.sales)
  })

  const segmentedSales = segmentTimeSeries(sales, interval)

  return segmentedSales
}

export const getTotalIncomeByDate = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const orderPrices = (await Order.aggregate([
    { $match: { date: { $gte: startDate } } },
    { $project: { date: 1, price: 1, _id: 0 } },
  ])) as { date: Date; price: number }[]

  const orderDates: Date[] = orderPrices.map((order) => order.date)

  const segmentedIncome = segmentTimeSeries(
    orderDates,
    interval,
    orderPrices.map((order) => order.price)
  )

  return segmentedIncome
}

export const getTotalIncomeByRegion = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const orderPrices = (await Order.aggregate([
    { $match: { date: { $gte: startDate } } },
    {
      $group: {
        _id: '$region',
        price: { $sum: '$price' },
      },
    },
    { $project: { date: 1, price: 1, region: 1, _id: 1 } },
  ])) as { date: Date; price: number; region: string }[]

  const orderPricesWithRegions = ((await Order.populate(orderPrices, {
    path: '_id',
    model: 'Region',
  })) as unknown) as {
    date: Date
    price: number
    _id: { _id: string; regionName: string }
  }[]

  const income = orderPricesWithRegions.map((region) => {
    return [region._id?.regionName || null, region.price]
  })

  return income
}

export const getTotalProfitByDate = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const orderPrices = (await Order.aggregate([
    { $match: { date: { $gte: startDate } } },
    { $project: { date: 1, price: 1, partner: 1, _id: 0 } },
  ])) as { date: Date; price: number; partner: string }[]

  const orderPricesWithPartners = ((await Order.populate(orderPrices, {
    path: 'partner',
  })) as unknown) as {
    date: Date
    price: number
    partner: { percentage: number }
  }[]

  const dates: Date[] = orderPricesWithPartners.map((order) => order.date)

  const segmentedProfits = segmentTimeSeries(
    dates,
    interval,
    orderPricesWithPartners.map(
      (order) => (order.price * (order.partner?.percentage || 0)) / 100
    )
  )

  return segmentedProfits
}

export const getTotalProfitByRegion = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const orderPrices = (await Order.aggregate([
    { $match: { date: { $gte: startDate } } },
    {
      $group: {
        _id: '$region',
        prices: { $push: { partner: '$partner', price: '$price' } },
      },
    },
    { $project: { date: 1, prices: 1, _id: 1 } },
  ])) as { _id: string; prices: [{ partner: string; price: number }] }[]

  const orderPricesWithRegions = ((await Order.populate(orderPrices, [
    { path: '_id', model: 'Region' },
    { path: 'prices.partner', model: 'Partner' },
  ])) as unknown) as {
    _id: { regionName: string }
    prices: [{ partner: { percentage: number }; price: number }]
  }[]

  const profits = orderPricesWithRegions.map((region) => {
    return [
      region._id?.regionName || null,
      region.prices
        .map((order) => (order.price * (order.partner?.percentage || 0)) / 100)
        .reduce((a, b) => a + b),
    ]
  })

  return profits
}

export const getOrdersByType = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const ordersByType = await Order.aggregate([
    { $match: { date: { $gte: startDate } } },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    },
  ])

  const orders = ordersByType.map((order) => {
    return [order._id, order.count]
  })

  return orders
}

export const getProductsByType = async (
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const productsByType = await Product.aggregate([
    { $match: { date: { $gte: startDate } } },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    },
  ])

  const products = productsByType.map((product) => {
    return [product._id, product.count]
  })

  return products
}

export const getPartners = async () => {
  const totalCount = await Partner.countDocuments()
  const dayCount = (await Partner.aggregate([
    { $match: { joined: { $gte: subDays(new Date(), 1) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const weekCount = (await Partner.aggregate([
    { $match: { joined: { $gte: subDays(new Date(), 7) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const monthCount = (await Partner.aggregate([
    { $match: { joined: { $gte: subDays(new Date(), 30) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  return {
    count: {
      total: totalCount,
      day: dayCount[0]?.count || 0,
      week: weekCount[0]?.count || 0,
      month: monthCount[0]?.count || 0,
    },
  }
}

export const getOrders = async () => {
  const totalCount = await Order.countDocuments()
  const dayCount = (await Order.aggregate([
    { $match: { date: { $gte: subDays(new Date(), 1) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const weekCount = (await Order.aggregate([
    { $match: { date: { $gte: subDays(new Date(), 7) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const monthCount = (await Order.aggregate([
    { $match: { date: { $gte: subDays(new Date(), 30) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  return {
    count: {
      total: totalCount,
      day: dayCount[0]?.count || 0,
      week: weekCount[0]?.count || 0,
      month: monthCount[0]?.count || 0,
    },
  }
}

export const getUsers = async () => {
  const totalCount = await User.countDocuments()
  const dayCount = (await User.aggregate([
    { $match: { joined: { $gte: subDays(new Date(), 1) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const weekCount = (await User.aggregate([
    { $match: { joined: { $gte: subDays(new Date(), 7) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const monthCount = (await User.aggregate([
    { $match: { joined: { $gte: subDays(new Date(), 30) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  return {
    count: {
      total: totalCount,
      day: dayCount[0]?.count || 0,
      week: weekCount[0]?.count || 0,
      month: monthCount[0]?.count || 0,
    },
  }
}

export const getProducts = async () => {
  const totalCount = await Product.countDocuments()
  const dayCount = (await Product.aggregate([
    { $match: { date: { $gte: subDays(new Date(), 1) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const weekCount = (await Product.aggregate([
    { $match: { date: { $gte: subDays(new Date(), 7) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  const monthCount = (await Product.aggregate([
    { $match: { date: { $gte: subDays(new Date(), 30) } } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ])) as { count: number }[]

  return {
    count: {
      total: totalCount,
      day: dayCount[0]?.count || 0,
      week: weekCount[0]?.count || 0,
      month: monthCount[0]?.count || 0,
    },
  }
}

const getIncomeSince = async (since?: number) => {
  const startDate = since ? subDays(new Date(), since) : new Date(0)

  return (
    (
      await Order.aggregate([
        { $match: { date: { $gte: startDate } } },
        {
          $group: {
            _id: null,
            income: { $sum: '$price' },
          },
        },
      ])
    )[0]?.income || (0 as number)
  )
}

const getProfitSince = async (since?: number) => {
  const startDate = since ? subDays(new Date(), since) : new Date(0)
  const orderPrices = (await Order.aggregate([
    { $match: { date: { $gte: startDate } } },
    { $project: { price: 1, partner: 1, _id: 0 } },
  ])) as { date: Date; price: number; partner: string }[]

  const orderPricesWithPartners = ((await Order.populate(orderPrices, {
    path: 'partner',
  })) as unknown) as {
    date: Date
    price: number
    partner: { percentage: number }
  }[]

  const profit = orderPricesWithPartners.map(
    (order) => (order.price * (order.partner?.percentage || 0)) / 100
  )

  return profit.length === 0 ? 0 : profit.reduce((a, b) => a + b)
}

export const getFinance = async () => {
  return {
    income: {
      total: await getIncomeSince(),
      day: await getIncomeSince(1),
      week: await getIncomeSince(7),
      month: await getIncomeSince(30),
    },
    profit: {
      total: await getProfitSince(),
      day: await getProfitSince(1),
      week: await getProfitSince(7),
      month: await getProfitSince(30),
    },
  }
}

/**
 * Specific partner analytics
 */

export const getPartnerViews = async (
  id: string,
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const partnerViews = (await Partner.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    { $unwind: '$views' },
    { $match: { views: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        views: { $push: '$views' },
      },
    },
    { $project: { views: '$views', _id: 0 } },
  ])) as { views: Date[] }[]

  const views: Date[] = []

  partnerViews.forEach((value) => {
    views.push(...value.views)
  })

  const segmentedViews = segmentTimeSeries(views, interval)

  return segmentedViews
}

export const getPartnerSales = async (
  id: string,
  interval: DateInterval = DateInterval.any
) => {
  const startDate = getStartDate(interval)
  const partnerSales = (await Partner.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    { $unwind: '$itemsPurchased' },
    { $match: { itemsPurchased: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        itemsPurchased: { $push: '$itemsPurchased' },
      },
    },
    { $project: { sales: '$itemsPurchased', _id: 0 } },
  ])) as { sales: Date[] }[]

  const sales: Date[] = []

  partnerSales.forEach((value) => {
    sales.push(...value.sales)
  })

  const segmentedSales = segmentTimeSeries(sales, interval)

  return segmentedSales
}

export const getInstagram = async () => {
  const configs = await Configuration.getSingleton()

  const instagramId = configs.instagramId

  if (!instagramId) throw new NotFoundError(new Error('Key not found'))

  const response = await axios.get(
    `https://www.instagram.com/${instagramId}/?__a=1`,
    {
      responseType: 'json',
      headers: {
        Cookie: `sessionid=${process.env.INSTAGRAM_SESSION_ID};`, // TEMPORARY SOLUTION, works for now (but please dont do this lol)
      },
    }
  )

  if (!response?.data) throw new NotFoundError(new Error('Could not get data'))

  const analytics = response?.data as InstagramResponse

  return {
    followers: analytics.graphql.user.edge_followed_by.count,
    follows: analytics.graphql.user.edge_follow.count,
    posts: {
      total: analytics.graphql.user.edge_owner_to_timeline_media.count,
      videos: analytics.graphql.user.edge_felix_video_timeline.count,
    },
    average_likes: {
      total: getAverageLikes(
        analytics.graphql.user.edge_owner_to_timeline_media
      ),
      videos: getAverageLikes(analytics.graphql.user.edge_felix_video_timeline),
    },
    average_comments: {
      total: getAverageComments(
        analytics.graphql.user.edge_owner_to_timeline_media
      ),
      videos: getAverageComments(
        analytics.graphql.user.edge_felix_video_timeline
      ),
    },
    time_statistics: {
      likes: analytics.graphql.user.edge_owner_to_timeline_media.edges.map(
        (post) => {
          return [post.node.taken_at_timestamp, post.node.edge_liked_by.count]
        }
      ),
      comments: analytics.graphql.user.edge_owner_to_timeline_media.edges.map(
        (post) => {
          return [
            post.node.taken_at_timestamp,
            post.node.edge_media_to_comment.count,
          ]
        }
      ),
      video_views: analytics.graphql.user.edge_felix_video_timeline.edges.map(
        (post) => {
          return [post.node.taken_at_timestamp, post.node.video_view_count]
        }
      ),
    },
    average_video_views:
      analytics.graphql.user.edge_felix_video_timeline.edges
        .map((video) => video.node.video_view_count)
        ?.reduce((a, b) => a + b) || 0,
  }
}
