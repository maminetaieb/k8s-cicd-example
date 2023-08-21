import React from 'react'
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs'

const PageButton = ({ children, onClick, disabled, number, active }) => {
  return (
    <div
      className={`rounded-md border flex p-1 items-center justify-center w-6 h-6  text-base ${
        disabled
          ? 'text-gray-300 border-gray-300 cursor-not-allowed'
          : `cursor-pointer ${
              active
                ? 'text-table-pagination-button-active border-table-pagination-button-active'
                : 'text-table-pagination-button border-table-pagination-button'
            } `
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {number}
      {children}
    </div>
  )
}

const getSlicedButtons = (pageIndex, totalPages) => {
  const slicedRange = totalPages - 2
  const buttonCount = 1

  // display no buttons if there is only 2 pages
  if (slicedRange === 0) return []

  const range = [totalPages - 1, 0].includes(pageIndex) ? [] : [pageIndex]

  for (
    let i = pageIndex + 1, j = 0;
    i < totalPages - 1 && j < buttonCount;
    i++, j++
  ) {
    range.push(i)
  }

  for (let i = pageIndex - 1, j = 0; i > 0 && j < buttonCount; i--, j++) {
    range.unshift(i)
  }

  return range
}

export const PaginationControl = ({
  gotoPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  nextPage,
  totalPages,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}) => {
  return (
    <div className="w-full flex items-center sm:flex-row flex-col-reverse justify-center sm:justify-between select-none text-table-t-weak text-sm focus:outline-none py-1">
      <div className="flex items-center w-min space-x-1 py-1 sm:py-0">
        <PageButton onClick={() => previousPage()} disabled={!canPreviousPage}>
          <BsCaretLeft />
        </PageButton>
        {totalPages <= 1 ? (
          <PageButton onClick={() => gotoPage(0)} active={pageIndex === 0}>
            1
          </PageButton>
        ) : (
          <>
            <PageButton onClick={() => gotoPage(0)} active={pageIndex === 0}>
              1
            </PageButton>
            {getSlicedButtons(pageIndex, totalPages).map((pageNumber) => (
              <PageButton
                onClick={() => gotoPage(pageNumber)}
                active={pageIndex === pageNumber}
                key={pageNumber}
              >
                {pageNumber + 1}
              </PageButton>
            ))}
            <PageButton
              onClick={() => gotoPage(totalPages - 1)}
              active={pageIndex === totalPages - 1}
            >
              {totalPages}
            </PageButton>
          </>
        )}

        <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
          <BsCaretRight />
        </PageButton>
      </div>
      <div className="flex items-center justify-around w-full sm:justify-between sm:w-1/2">
        <div className="flex items-center space-x-1">
          <div className="whitespace-nowrap">Go to page</div>
          <input
            className="p-1 text-table-t-stronger focus:outline-none rounded-md border-table-seperator border bg-white"
            type="number"
            min="1"
            max={totalPages}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </div>
        <select
          className="p-1 text-table-t-stronger focus:outline-none rounded-md border-table-seperator border bg-white"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="text-table-t-stronger focus:outline-none"
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
