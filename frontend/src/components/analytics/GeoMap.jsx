import React from 'react'
import { Chart } from 'react-google-charts'
import { useConfiguration } from '../../hooks'

export const GeoMap = ({ title, locations }) => {
  const { data: configData } = useConfiguration()

  return (
    <div className="flex flex-col align-center rounded-lg border border-table-seperator select-none w-full max-w-xs">
      <div className="text-base text-primary text-center font-medium">
        {title}
      </div>

      <div className="relative overflow-hidden h-login-container w-full">
        <Chart
          className="absolute transform -translate-x-1/3 -translate-y-8"
          width={'900px'}
          chartType="GeoChart"
          data={[['Latitude', 'Longitude', 'size'], [0, 0, 2], ...locations]}
          options={{
            magnifyingGlass: { enable: false },
            sizeAxis: { minValue: 1, maxValue: 2, minSize: 3, maxSize: 10 },
            tooltip: { trigger: 'none' },
            region: 'TN',
            resolution: 'provinces',
            displayMode: 'markers',
            markerOpacity: 0.8,
            colorAxis: { colors: ['rgb(33,133,213)', '#4374e0'] },
            legend: { title },
            enableRegionInteractivity: true,
          }}
          mapsApiKey={configData?.googleKey || ''}
          rootProps={{ 'data-testid': '3' }}
        />
      </div>
    </div>
  )
}
