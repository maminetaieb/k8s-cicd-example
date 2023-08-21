import React from 'react'
import { SingleData } from '.'
import {
  usePartners,
  useFinance,
  useOrders,
  useUsers,
  useProducts,
  useInstagram,
} from '../../hooks/analytics'

export const SingleDataSection = ({ children }) => {
  const spacedChildren = React.Children.map(children, (child, index) => (
    <div
      key={index}
      className="w-1/2 sm:w-auto flex items-center justify-center p-2"
    >
      {child}
    </div>
  ))

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-evenly">
      {spacedChildren}
    </div>
  )
}

export const PartnerSingleDataSection = () => {
  const { data, isLoading, isError } = usePartners()

  return (
    <SingleDataSection>
      <SingleData
        label="Total partners"
        value={data?.analytics.count.total}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="partners this month"
        value={data?.analytics.count.month}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="partners this week"
        value={data?.analytics.count.week}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="partners yesterday"
        value={data?.analytics.count.day}
        isLoading={isLoading}
        isError={isError}
      />
    </SingleDataSection>
  )
}

export const UserSingleDataSection = () => {
  const { data, isLoading, isError } = useUsers()

  return (
    <SingleDataSection>
      <SingleData
        label="Total users"
        value={data?.analytics.count.total}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="users this month"
        value={data?.analytics.count.month}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="users this week"
        value={data?.analytics.count.week}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="users yesterday"
        value={data?.analytics.count.day}
        isLoading={isLoading}
        isError={isError}
      />
    </SingleDataSection>
  )
}

export const OrderSingleDataSection = () => {
  const { data, isLoading, isError } = useOrders()

  return (
    <SingleDataSection>
      <SingleData
        label="Total orders"
        value={data?.analytics.count.total}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="orders this month"
        value={data?.analytics.count.month}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="orders this week"
        value={data?.analytics.count.week}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="orders yesterday"
        value={data?.analytics.count.day}
        isLoading={isLoading}
        isError={isError}
      />
    </SingleDataSection>
  )
}

export const ProductSingleDataSection = () => {
  const { data, isLoading, isError } = useProducts()

  return (
    <SingleDataSection>
      <SingleData
        label="Total products"
        value={data?.analytics.count.total}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="products this month"
        value={data?.analytics.count.month}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="products this week"
        value={data?.analytics.count.week}
        isLoading={isLoading}
        isError={isError}
      />
      <SingleData
        label="products yesterday"
        value={data?.analytics.count.day}
        isLoading={isLoading}
        isError={isError}
      />
    </SingleDataSection>
  )
}

export const FinanceSingleDataSection = () => {
  const { data, isLoading, isError } = useFinance()

  return (
    <>
      <SingleDataSection>
        <SingleData
          label="Total income"
          value={data?.analytics.income.total}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
        <SingleData
          label="income this month"
          value={data?.analytics.income.month}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
        <SingleData
          label="income this week"
          value={data?.analytics.income.week}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
        <SingleData
          label="income yesterday"
          value={data?.analytics.income.day}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
      </SingleDataSection>
      <SingleDataSection>
        <SingleData
          label="Total profit"
          value={data?.analytics.profit.total}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
        <SingleData
          label="profit this month"
          value={data?.analytics.profit.month}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
        <SingleData
          label="profit this week"
          value={data?.analytics.profit.week}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
        <SingleData
          label="profit yesterday"
          value={data?.analytics.profit.day}
          isLoading={isLoading}
          isError={isError}
          isCurrency={true}
        />
      </SingleDataSection>
    </>
  )
}

export const InstagramSingleDataSection = () => {
  const { data, isLoading, isError } = useInstagram()

  return (
    <>
      <SingleDataSection>
        <SingleData
          label="Followers"
          value={data?.analytics.followers}
          isLoading={isLoading}
          isError={isError}
        />
        <SingleData
          label="Follows"
          value={data?.analytics.follows}
          isLoading={isLoading}
          isError={isError}
        />
        <SingleData
          label="Total Posts"
          value={data?.analytics.posts.total}
          isLoading={isLoading}
          isError={isError}
        />
        <SingleData
          label="Total Videos"
          value={data?.analytics.posts.videos}
          isLoading={isLoading}
          isError={isError}
        />
      </SingleDataSection>
      <SingleDataSection>
        <SingleData
          label="Average Likes"
          value={data?.analytics.average_likes.total}
          isLoading={isLoading}
          isError={isError}
        />
        <SingleData
          label="Average Video Likes"
          value={data?.analytics.average_likes.videos}
          isLoading={isLoading}
          isError={isError}
        />
        <SingleData
          label="Average Comments"
          value={data?.analytics.average_comments.total}
          isLoading={isLoading}
          isError={isError}
        />
        <SingleData
          label="Average Video Views"
          value={
            data?.analytics.average_video_views /
              data?.analytics.posts.videos || 1
          }
          isLoading={isLoading}
          isError={isError}
        />
      </SingleDataSection>
    </>
  )
}
