import React from 'react'
import {
  FinanceSingleDataSection,
  FinancialIncomeByDate,
  FinancialIncomeByRegion,
  FinancialProfitByDate,
  FinancialProfitByRegion,
} from '../../components/analytics'
import { Section } from '../../components/modelView'

export const Finance = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-4 space-y-4">
      <div className="flex items-center text-2xl text-secondary font-semibold self-start">
        Financial Analytics
      </div>
      <Section title="General Statistics">
        <FinanceSingleDataSection />
      </Section>
      <Section title="Graphs & Visualizations">
        <div className="space-y-5 p-2">
          <FinancialIncomeByDate />
          <FinancialIncomeByRegion />
          <FinancialProfitByDate />
          <FinancialProfitByRegion />
        </div>
      </Section>
    </div>
  )
}
