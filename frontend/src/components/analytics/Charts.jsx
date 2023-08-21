import React, { useMemo, useState } from 'react'
import {
  usePartnersSales,
  usePartnersViews,
  useOrdersByType,
  useFinancialIncomeByDate,
  useFinancialIncomeByRegion,
  useFinancialProfitByDate,
  useFinancialProfitByRegion,
  useOrdersDates,
  useProductsByType,
  usePartnersLocations,
  useUsersLocations,
  useSinglePartnerViews,
  useSinglePartnerSales,
  useInstagram,
} from '../../hooks/analytics'
import { TimeLineChart, IntervalSince, GeoMap } from '.'
import { ErrorScreen, LoadingScreen } from '../modelView'
import { PieChart } from './PieChart'

export const FinancialIncomeByRegion = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useFinancialIncomeByRegion({
    since: interval,
  })

  const profit = useMemo(() => data?.income, [data])

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <PieChart
          data={profit}
          title={`Financial Income by region`}
          label={`Region`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const FinancialProfitByRegion = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useFinancialProfitByRegion({
    since: interval,
  })

  const profit = useMemo(() => data?.profit, [data])

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <PieChart
          data={profit}
          title={`Financial profit by region`}
          label={`Region`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const ProductsTypesByTime = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useProductsByType({ since: interval })

  const products = useMemo(() => data?.products, [data])

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <PieChart
          data={products}
          title={`Total products by type`}
          label={`Types`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const OrdersByDate = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useOrdersDates({
    since: interval,
  })

  const timeData = useMemo(
    () =>
      data?.orders
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Total Orders`}
          label={`Orders`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const FinancialProfitByDate = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useFinancialProfitByDate({
    since: interval,
  })

  const timeData = useMemo(
    () =>
      data?.profit
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Total Financial Profit`}
          label={`Profit (TND)`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const FinancialIncomeByDate = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useFinancialIncomeByDate({
    since: interval,
  })

  const timeData = useMemo(
    () =>
      data?.income
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Total Financial Income`}
          label={`income (TND)`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const PartnerViewsByTime = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = usePartnersViews({ since: interval })

  const timeData = useMemo(
    () =>
      data?.views
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Total Partners views`}
          label={`Views`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const PartnerSalesByTime = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = usePartnersSales({ since: interval })

  const timeData = useMemo(
    () =>
      data?.sales
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Total Partners sales`}
          label={`sales`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const OrdersTypesByTime = () => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useOrdersByType({ since: interval })

  const ordersData = useMemo(() => data?.orders, [data])

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <PieChart
          data={ordersData}
          title={`Total orders by type`}
          label={`Types`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const PartnersGeoMap = () => {
  const { data, isLoading, isError } = usePartnersLocations()

  const locations = useMemo(() => {
    if (isLoading || isError) return []
    return data.locations.map(({ localisation }) => {
      return [localisation.lat, localisation.lng, 1]
    })
  }, [data, isLoading, isError])

  return <GeoMap title="Partner Locations" locations={locations} />
}

export const UsersGeoMap = () => {
  const { data, isLoading, isError } = useUsersLocations()

  const locations = useMemo(() => {
    if (isLoading || isError) return []
    return data.locations
      .map(({ location }) => {
        if (!location) return null
        return [location.latitude, location.longitude, 1]
      })
      .filter((location) => location !== null)
  }, [data, isLoading, isError])

  return <GeoMap title="User Locations" locations={locations} />
}

export const SinglePartnerViewsByTime = ({ id }) => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useSinglePartnerViews({
    id,
    since: interval,
  })

  const timeData = useMemo(
    () =>
      data?.views
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Partner views`}
          label={`Views`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const SinglePartnerSalesByTime = ({ id }) => {
  const [interval, setInterval] = useState(IntervalSince.any)
  const { data, isLoading, isError } = useSinglePartnerSales({
    id,
    since: interval,
  })

  const timeData = useMemo(
    () =>
      data?.sales
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Partner sales`}
          label={`sales`}
          interval={interval}
          setInterval={setInterval}
        />
      )}
    </div>
  )
}

export const InstagramCommentsByTime = () => {
  const { data, isLoading, isError } = useInstagram()

  const timeData = useMemo(
    () =>
      data?.analytics.time_statistics.comments
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Instagram Comments`}
          label={`comments`}
          intervalPicker={false}
        />
      )}
    </div>
  )
}

export const InstagramLikesByTime = () => {
  const { data, isLoading, isError } = useInstagram()

  const timeData = useMemo(
    () =>
      data?.analytics.time_statistics.likes
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Instagram Likes`}
          label={`likes`}
          intervalPicker={false}
        />
      )}
    </div>
  )
}

export const InstagramVideoViewsByTime = () => {
  const { data, isLoading, isError } = useInstagram()

  const timeData = useMemo(
    () =>
      data?.analytics.time_statistics.video_views
        .map((range) => [new Date(Number.parseInt(range[0])), range[1]])
        .sort((a, b) => a[0].getTime() - b[0].getTime()) || [],
    [data]
  )

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <TimeLineChart
          timeData={timeData}
          title={`Instagram Video Views`}
          label={`views`}
          intervalPicker={false}
        />
      )}
    </div>
  )
}

export const InstagramPostsByType = () => {
  const { data, isLoading, isError } = useInstagram()

  const postsData = [
    ['Images', data?.analytics.posts.total - data?.analytics.posts.videos],
    ['Videos', data?.analytics.posts.videos],
  ]

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <PieChart
          data={postsData}
          title={`Posts by type`}
          label={`Posts`}
          intervalPicker={false}
        />
      )}
    </div>
  )
}

export const InstagramLikesByType = () => {
  const { data, isLoading, isError } = useInstagram()

  const postsData = [
    ['Images', data?.analytics.average_likes.total],
    ['Videos', data?.analytics.average_likes.videos],
  ]

  return (
    <div className="w-full h-64 flex overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load the data</ErrorScreen>
      ) : (
        <PieChart
          data={postsData}
          title={`Post Likes by type`}
          label={`Likes`}
          intervalPicker={false}
        />
      )}
    </div>
  )
}
