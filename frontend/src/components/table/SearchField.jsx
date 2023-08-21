import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useAsyncDebounce } from 'react-table'
import { AiOutlineSearch } from 'react-icons/ai'
import qs from 'qs'

export const SearchField = ({ search, setSearch }) => {
  const { search: searchParams } = useLocation()
  const [value, setValue] = useState()

  const onChange = useAsyncDebounce((value) => {
    if (value?.length >= 4) setSearch(value || null)
  }, 400)

  useEffect(() => {
    const { search } = qs.parse(searchParams, {
      ignoreQueryPrefix: true,
    })
    setValue(search)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-60">
      <input
        autoComplete="false"
        className="w-full p-1 pr-7 rounded-md flex items-center border border-primary focus:outline-none focus:border-secondary text-sm text-table-t-strong focus:text-table-t-stronger  placeholder-table-t-weak"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') setSearch(value || null)
        }}
        placeholder={`Search`}
      ></input>
      <AiOutlineSearch className="absolute w-6 right-2 top-2 text-primary" />
    </div>
  )
}
