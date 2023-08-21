import React from 'react'
import {
  PartnersGeoMap,
  UsersGeoMap,
  PartnerViewsByTime,
  PartnerSalesByTime,
  PartnerSingleDataSection,
  UserSingleDataSection,
} from '../../components/analytics'
import { Section } from '../../components/modelView'

export const Partners = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-4 space-y-4">
      <div className="flex items-center text-2xl text-secondary font-semibold self-start">
        Partners & Users Analytics
      </div>
      <div className="w-full flex flex-col items-center md:flex-row md:justify-evenly md:items-start space-x-2 space-y-2">
        <div className="w-full flex flex-col items-center">
          <Section title="General Statistics">
            <PartnerSingleDataSection />
            <UserSingleDataSection />
          </Section>
          <Section title="Graphs & Visualizations">
            <div className="space-y-5 p-2">
              <PartnerViewsByTime />
              <PartnerSalesByTime />
            </div>
          </Section>
        </div>
        <div className="flex flex-col items-center space-y-5 w-full p-2">
          <PartnersGeoMap />
          <UsersGeoMap />
        </div>
      </div>
    </div>
  )
}
