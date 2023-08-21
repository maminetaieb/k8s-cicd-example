import React from 'react'
import { IntervalSince } from '.'

export const IntervalPicker = ({ setInterval, interval }) => (
  <div className="self-end text-xs text-table-t-strong font-light flex justify-end space-x-1 items-center whitespace-nowrap">
    <div>Show results for the past</div>
    <div>
      <select
        className="p-0 text-table-t-stronger focus:outline-none rounded-md border-table-seperator border bg-white"
        value={interval}
        onChange={(e) => {
          setInterval(e.target.value)
        }}
      >
        {Object.keys(IntervalSince).map((interval) => (
          <option
            key={interval}
            value={interval}
            className="text-table-t-stronger focus:outline-none"
          >
            {interval}
          </option>
        ))}
      </select>
    </div>
  </div>
)
