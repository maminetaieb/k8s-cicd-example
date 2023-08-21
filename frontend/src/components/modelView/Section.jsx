import React from 'react'

export const Section = ({ title, children }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center space-x-1 text-xs text-table-t-weak uppercase font-medium">
        <div className="whitespace-nowrap">{title}</div>
        <hr className="w-full" />
      </div>
      <div>{children}</div>
    </div>
  )
}

export const SectionItem = ({ title, value }) => {
  return (
    <div className="contents">
      <div className="text-sm text-table-t-strong col-span-1">{`${title}`}</div>
      <div className="text-base text-table-t-stronger col-span-2">{value}</div>
    </div>
  )
}

export const BooleanText = ({ value }) => {
  return (
    <span className="font-semibold">
      {value ? (
        <div className="text-success">Yes</div>
      ) : (
        <div className="text-error">No</div>
      )}
    </span>
  )
}
