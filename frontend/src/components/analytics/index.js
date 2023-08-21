import { GeoMap } from './GeoMap'
import { SingleData } from './SingleData'
import { TimeLineChart } from './TimeLineChart'
import { PieChart } from './PieChart'
import {
  PartnerViewsByTime,
  PartnerSalesByTime,
  OrdersTypesByTime,
  PartnersGeoMap,
  UsersGeoMap,
  FinancialIncomeByDate,
  FinancialIncomeByRegion,
  FinancialProfitByDate,
  FinancialProfitByRegion,
  OrdersByDate,
  ProductsTypesByTime,
  SinglePartnerSalesByTime,
  SinglePartnerViewsByTime,
  InstagramCommentsByTime,
  InstagramLikesByTime,
  InstagramLikesByType,
  InstagramPostsByType,
  InstagramVideoViewsByTime,
} from './Charts'
import { IntervalPicker } from './IntervalPicker'
import {
  PartnerSingleDataSection,
  FinanceSingleDataSection,
  OrderSingleDataSection,
  ProductSingleDataSection,
  SingleDataSection,
  UserSingleDataSection,
  InstagramSingleDataSection,
} from './SingleDataRows'

export {
  GeoMap,
  SingleData,
  TimeLineChart,
  PieChart,
  PartnerViewsByTime,
  PartnerSalesByTime,
  IntervalPicker,
  OrdersTypesByTime,
  PartnerSingleDataSection,
  FinanceSingleDataSection,
  OrderSingleDataSection,
  ProductSingleDataSection,
  SingleDataSection,
  UserSingleDataSection,
  PartnersGeoMap,
  UsersGeoMap,
  FinancialIncomeByDate,
  FinancialIncomeByRegion,
  FinancialProfitByDate,
  FinancialProfitByRegion,
  OrdersByDate,
  ProductsTypesByTime,
  SinglePartnerSalesByTime,
  SinglePartnerViewsByTime,
  InstagramSingleDataSection,
  InstagramCommentsByTime,
  InstagramLikesByTime,
  InstagramLikesByType,
  InstagramPostsByType,
  InstagramVideoViewsByTime,
}

export const IntervalSince = Object.freeze({
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
  any: 'any',
})

export const getLabelByInterval = (interval) => {
  switch (interval) {
    case IntervalSince.day:
      return 'Hour'
    case IntervalSince.any:
    case IntervalSince.year:
      return 'Month'
    default:
      return 'Day'
  }
}
