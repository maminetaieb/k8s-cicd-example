import React, { useCallback, useEffect } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { PaginationControl } from './PaginationControl'
import { useHistory, useLocation } from 'react-router-dom'
import {
  AiFillCaretUp,
  AiFillCaretDown,
  AiOutlineLoading,
} from 'react-icons/ai'
import qs from 'qs'
import { isString } from '../../utils'

export const Table = ({
  columns,
  data,
  setPaginationOptions,
  loading,
  fetching,
  totalPages,
  searchFilter,
  filters,
}) => {
  const { search, pathname } = useLocation()
  const { push } = useHistory()

  const navigateToSpecificItem = useCallback(
    (row) => {
      push(`${pathname}/${row.original._id}`)
    },
    [push, pathname]
  )

  const params = React.useMemo(
    () =>
      qs.parse(search, {
        ignoreQueryPrefix: true,
      }),
    [] // eslint-disable-line
  )

  const initialState = {
    pageIndex: Number.parseInt(params.pageIndex) - 1,
    pageSize: Number.parseInt(params.pageSize),
    sortBy: React.useMemo(() => params.sortBy, []), // eslint-disable-line
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: data?.docs ?? [],
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount: totalPages,
      initialState: {
        pageIndex: !Number.isNaN(initialState.pageIndex)
          ? initialState.pageIndex
          : 0,
        pageSize: !Number.isNaN(initialState.pageSize)
          ? initialState.pageSize
          : 10,
        sortBy:
          initialState.sortBy &&
          initialState.sortBy.map((sort) => sort.id).reduce((p, c) => p && c)
            ? initialState.sortBy
            : [],
      },
    },
    useSortBy,
    usePagination
  )

  useEffect(() => {
    setPaginationOptions({ pageIndex: pageIndex + 1, pageSize, sortBy })
  }, [sortBy, setPaginationOptions, pageIndex, pageSize])

  /*
  // this breaks refreshing the page, find easier way to do this.
  useEffect(() => {
    gotoPage(0)
  }, [filters, searchFilter, gotoPage])
  */

  return (
    <div className="flex flex-col">
      <div className="text-xs text-table-t-weak py-1">
        {loading ? (
          <div className="flex space-x-2 items-center">
            <div>Loading</div>
            <AiOutlineLoading className="animate-spin w-3" />
          </div>
        ) : (
          <>
            Showing {page.length} of {data.totalDocs} results
          </>
        )}
      </div>
      <div className="w-full flex overflow-x-scroll pb-2 scrollbar-thumb-scrollbar scrollbar-thumb-rounded scrollbar-thin">
        <table
          className="table-auto text-base border-collapse w-full"
          {...getTableProps()}
        >
          <thead className="">
            {headerGroups.map((headerGroup) => (
              <tr
                className="manage-header"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="border-table-header px-2 py-3 "
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="flex space-x-1 whitespace-nowrap items-center justify-center text-center text-sm font-semibold">
                      {column.render('Header')}
                      <span className="">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <AiFillCaretDown className="w-3" />
                          ) : (
                            <AiFillCaretUp className="w-3" />
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr
                  className={`${
                    i % 2 === 0 ? 'bg-table-row-light' : 'bg-table-row-dark'
                  } text-sm whitespace-nowrap cursor-pointer hover:bg-table-seperator transition-colors text-table-t-stronger`}
                  onClick={() => navigateToSpecificItem(row)}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="px-2 py-2 truncate max-w-xs"
                        title={isString(cell.value) ? cell.value : undefined}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <PaginationControl
        {...{
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
        }}
      />
    </div>
  )
}
