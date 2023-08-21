import React from 'react'
import Chart from 'react-google-charts'
import { LoadingScreen } from '../modelView'
import { IntervalPicker } from '.'

export const PieChart = ({
  data,
  title,
  label,
  interval,
  setInterval,
  intervalPicker = true,
}) => {
  return (
    <div className="flex flex-col rounded-md border border-table-seperator w-full p-1 space-y-1">
      {intervalPicker && (
        <IntervalPicker interval={interval} setInterval={setInterval} />
      )}
      <Chart
        width={'100%'}
        chartType="PieChart"
        loader={<LoadingScreen />}
        data={[[label, 'Count'], ...data]}
        options={{
          title,
          tooltip: { trigger: 'selection' },
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  )
}
