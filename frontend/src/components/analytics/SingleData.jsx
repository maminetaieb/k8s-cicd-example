import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export const SingleData = ({
  label,
  value,
  isLoading,
  isError,
  isNumber = true,
  isCurrency = false,
}) => {
  return (
    <div className="rounded-md border border-table-seperator flex flex-col w-40 h-20 items-center p-3">
      <div className="text-xl font-medium text-secondary text-center">
        {isLoading ? (
          <AiOutlineLoading3Quarters className="text-secondary w-8 h-8 p-1 animate-spin" />
        ) : isError ? (
          <span className="text-error">Loading Failed</span>
        ) : isNumber ? (
          `${formatter.format(value)}${isCurrency ? ' dinars' : ''}`
        ) : (
          value
        )}
      </div>
      <div className="text-sm font-light text-table-t-strong text-center whitespace-nowrap">
        {label}
      </div>
    </div>
  )
}
