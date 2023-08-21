import React, { useMemo } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { isString } from '../../utils'

const getTags = (filters) => {
  const tags = []
  Object.keys(filters).forEach((filter) => {
    // get initial values from the params
    const tag = {
      key: filter,
      value: undefined,
    }
    const filterValue = filters[filter]
    if (filterValue === undefined) return

    if (isString(filterValue)) {
      if (filterValue !== '') tag.value = filterValue
    } else if (filterValue.regex || filterValue.string) {
      tag.value = filterValue.regex || filterValue.string
    }
    tags.push(tag)
  })

  return tags
}

const removeFilter = (toRemove, filters, setFilters) => {
  const newFilters = {}
  Object.keys(filters).forEach((filter) => {
    if (filter === toRemove) return
    newFilters[filter] = filters[filter]
  })
  setFilters(newFilters)
}

const Tag = ({ name, value, remove }) => {
  const color = useMemo(
    () =>
      [
        'bg-secondary border-secondary',
        'bg-pink-600 border-pink-600',
        'bg-green-500 border-green-500',
        'bg-indigo-700 border-indigo-700',
        'bg-purple-700 border-purple-700',
      ][Math.floor(Math.random() * 5)],
    []
  )
  return (
    <div
      className={`rounded-full border px-2 py-1 ${color} text-xs flex items-center justify-center shadow-sm select-none text-page-background space-x-0.5`}
    >
      <div className="flex items-center">{`${name}:`}</div>
      <div className="flex items-center">{value}</div>
      <div
        className="rounded-full hover:bg-table-seperator flex items-center justify-center cursor-pointer"
        onClick={() => remove()}
      >
        <AiOutlineClose className="w-3 h-3" />
      </div>
    </div>
  )
}

export const Tags = ({ filters, setFilters }) => {
  return (
    <div className="flex w-full items-center flex-wrap space-x-0.5 space-y-0.5">
      {getTags(filters).map(({ key, value }) => (
        <Tag
          key={key}
          name={key}
          value={value}
          remove={() => removeFilter(key, filters, setFilters)}
        />
      ))}
    </div>
  )
}
