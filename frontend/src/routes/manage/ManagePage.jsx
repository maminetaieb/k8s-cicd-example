import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import {
  Table,
  SearchField,
  FilterButton,
  FilterModal,
  Tags,
} from '../../components/table'
import { usePaginationOptions } from '../../hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { omitNullOrDefaults } from '../../utils'
import qs from 'qs'

export const ManagePage = ({ config }) => {
  const { search } = useLocation()
  const { push } = useHistory()
  const {
    pageIndex,
    pageSize,
    sortBy,
    setPaginationOptions,
  } = usePaginationOptions()

  const [filters, setFilters] = useState({})
  const [searchFilter, setSearchFilter] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const didMount = useRef(false)

  useEffect(() => {
    const newSearch = qs.stringify({
      ...omitNullOrDefaults(
        {
          pageIndex,
          pageSize,
          sortBy,
          search: searchFilter,
        },
        {
          pageIndex: 1,
          pageSize: 10,
        }
      ),
      ...filters,
    })
    if (didMount && newSearch !== search) {
      push({
        search: qs.stringify({
          ...omitNullOrDefaults(
            {
              pageIndex,
              pageSize,
              sortBy,
              search: searchFilter,
            },
            {
              pageIndex: 1,
              pageSize: 10,
            }
          ),
          ...filters,
        }),
      })
    } else didMount.current = true
  }, [pageIndex, pageSize, sortBy, filters, searchFilter, push]) // eslint-disable-line

  useEffect(() => {
    const {
      pageIndex,
      pageSize,
      sortBy,
      search: searchFilter,
      ...filters
    } = qs.parse(search, {
      ignoreQueryPrefix: true,
    })
    setFilters(filters)
    setSearchFilter(searchFilter)

    return () => {
      setModalVisible(false)
    }
  }, []) // eslint-disable-line

  const columns = useMemo(() => config.columns, [config.columns])

  const { isLoading, isError, error, data } = useQuery(
    [config.key, pageIndex, pageSize, sortBy, searchFilter, filters],
    () =>
      config.fetch({
        ...omitNullOrDefaults(
          {
            pageIndex,
            pageSize,
            sortBy,
            search: searchFilter,
          },
          {
            pageIndex: 1,
            pageSize: 10,
          }
        ),
        filters,
      }),
    {
      keepPreviousData: true,
    }
  )

  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3 space-y-3">
      <div className="flex items-center text-2xl text-secondary font-semibold">
        {config.label}
      </div>
      <div id="filter-container" className="flex items-center space-x-1">
        <SearchField search={searchFilter} setSearch={setSearchFilter} />
        <FilterButton
          label="Advanced Search"
          onClick={() => setModalVisible(true)}
        />
      </div>
      <Tags filters={filters} setFilters={setFilters} />
      <div id="table-container" className="w-full">
        {isError ? (
          <div>{error.message}</div>
        ) : (
          <Table
            columns={columns}
            setPaginationOptions={setPaginationOptions}
            setFilters={setFilters}
            data={data}
            loading={isLoading}
            totalPages={data?.totalPages}
            filters={filters}
            searchFilter={searchFilter}
          />
        )}
      </div>
      <div>
        {modalVisible && (
          <FilterModal
            {...{
              close: () => setModalVisible(false),
              setFilters,
              filters,
              columns: columns.filter((col) => col.canQuery !== false),
            }}
          />
        )}
      </div>
    </div>
  )
}
