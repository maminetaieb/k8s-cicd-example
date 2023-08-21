import React from 'react'

export const LogList = ({ children }) => {
  return (
    <div className="w-full border border-table-seperator flex flex-col rounded-lg">
      {children}
    </div>
  )
}
