import React from 'react'

export const FilterButton = ({ onClick, label }) => {
  return (
    <button
      className="whitespace-nowrap text-page-background focus:outline-none rounded-md border border-secondary  bg-secondary p-1 hover:bg-table-pagination-button-active text-sm"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
