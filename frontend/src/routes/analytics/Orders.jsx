import React from 'react'
import {
  OrdersTypesByTime,
  ProductsTypesByTime,
  OrdersByDate,
  OrderSingleDataSection,
  ProductSingleDataSection,
} from '../../components/analytics'
import { Section } from '../../components/modelView'

export const Orders = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-4 space-y-4">
      <div className="flex items-center text-2xl text-secondary font-semibold self-start">
        Products & Orders Analytics
      </div>
      <Section title="General Statistics">
        <OrderSingleDataSection />
        <ProductSingleDataSection />
      </Section>
      <Section title="Graphs & Visualizations">
        <div className="space-y-5 p-2">
          <OrdersTypesByTime />
          <ProductsTypesByTime />
          <OrdersByDate />
        </div>
      </Section>
    </div>
  )
}
