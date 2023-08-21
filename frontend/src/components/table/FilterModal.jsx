import React from 'react'
import { Formik, Form } from 'formik'
import { BooleanInputField, InputField } from '../global'
import { isString } from '../../utils'

const getInitialColumnValues = (columns) => {
  const initialValues = {}
  columns.forEach((column) => {
    // get initial values from the params
    switch (column.type) {
      case String:
        initialValues[column.id] = {
          value: '',
          isRegex: false,
        }
        break
      default:
        initialValues[column.id] = ''
        break
    }
  })
  return initialValues
}

const extractFilters = (filters) => {
  const cleanFilters = {}
  Object.keys(filters).forEach((filter) => {
    // get initial values from the params
    const filterValue = filters[filter]
    if (isString(filterValue)) {
      if (filterValue !== '') cleanFilters[filter] = filterValue
    } else if (filterValue.value !== '') {
      cleanFilters[filter] = {
        [filterValue.isRegex ? 'regex' : 'string']: filterValue.value,
      }
    }
  })
  return cleanFilters
}

const getInitialFilterFields = (filters) => {
  const initialFilters = {}
  Object.keys(filters).forEach((filter) => {
    // get initial values from the params
    const filterValue = filters[filter]
    if (filterValue === undefined) return

    if (isString(filterValue)) {
      if (filterValue !== '') initialFilters[filter] = filterValue
    } else if (filterValue.regex || filterValue.string) {
      initialFilters[filter] = {
        value: filterValue.regex || filterValue.string,
        isRegex: !!filterValue.regex,
      }
    }
  })
  return initialFilters
}

/**
 * retuns field using type
 * @param {String | Date | Bool} type
 */
const getFilterFieldByType = (type) => {
  switch (type) {
    case String:
      return InputField
    case Boolean:
      return BooleanInputField
    default:
      return null
  }
}

export const FilterModal = ({ close, setFilters, filters, columns }) => {
  return (
    <div
      onClick={() => close()}
      className="fixed backdrop-filter backdrop-blur-sm cursor-pointer flex top-0 left-0 z-50 w-screen h-screen bg-opacity-50 bg-black items-center justify-center"
    >
      <div
        className="bg-page-background rounded-md md:max-w-xl sm:max-w-lg max-w-xs w-full flex flex-col p-3 cursor-auto items-center space-y-1"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          id="header"
          className="w-full text-lg text-secondary font-semibold flex align-center"
        >
          Advanced Search
        </div>
        <hr className="w-full text-table-t-weak text-center" />
        <div id="body" className="w-full">
          <Formik
            initialValues={{
              ...getInitialColumnValues(columns),
              ...getInitialFilterFields(filters),
            }}
            onSubmit={(values) => {
              setFilters(extractFilters(values))
              close()
            }}
          >
            {(props) => (
              <Form className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {columns.map((column) => {
                    const Field = getFilterFieldByType(column.type)
                    if (!Field) return null
                    return (
                      <Field
                        key={column.id}
                        name={column.id}
                        label={column.Header}
                      />
                    )
                  })}
                </div>
                <div className="w-full flex items-center justify-end mt-3 px-1 space-x-2">
                  <button
                    type="reset"
                    className="text-secondary focus:outline-none rounded-md bg-page-background px-2 py-1 hover:bg-table-seperator border border-secondary text-sm"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-page-background focus:outline-none rounded-md bg-secondary px-5 py-1 hover:bg-table-pagination-button-active border border-secondary text-sm"
                  >
                    Apply Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
