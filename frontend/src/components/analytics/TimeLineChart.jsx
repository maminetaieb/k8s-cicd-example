import React from 'react'
import Chart from 'react-google-charts'
import { LoadingScreen } from '../modelView'
import { IntervalPicker, getLabelByInterval } from '.'

export const TimeLineChart = ({
  timeData,
  title,
  label,
  interval,
  setInterval,
  intervalPicker = true,
}) => {
  return (
    <div className="flex flex-col rounded-md border border-table-seperator w-full p-1 space-y-1">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="text-sm text-table-t-stronger font-medium">{title}</div>
        {intervalPicker && (
          <IntervalPicker setInterval={setInterval} interval={interval} />
        )}
      </div>
      <Chart
        width={'100%'}
        chartType="Line"
        loader={<LoadingScreen />}
        data={
          timeData.length !== 0
            ? [
                [
                  {
                    type: 'date',
                    label: intervalPicker
                      ? getLabelByInterval(interval)
                      : 'Date',
                  },
                  { type: 'number', label },
                ],
                ...timeData,
              ]
            : [
                [
                  {
                    type: 'date',
                    label: intervalPicker
                      ? getLabelByInterval(interval)
                      : 'Date',
                  },
                  { type: 'number', label },
                ],
                [new Date('bruh'), 0], // hack to avoid error when no data (no idea why an error happens when no data lol)
              ]
        }
        options={{
          series: {
            0: { axis: label },
          },
          axes: {
            y: {
              [label]: { label },
            },
          },
          tooltip: { trigger: 'selection' },
        }}
        rootProps={{ 'data-testid': '4' }}
      />
    </div>
  )
}
