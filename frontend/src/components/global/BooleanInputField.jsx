import React from 'react'
import { useField } from 'formik'

const commonClassName =
  'w-36 border-b-1 border-r-0 border-t-0 border-l-0 px-2 py-1 mr-2 flex text-center cursor-pointer border focus:outline-none focus:border-secondary text-sm text-table-t-strong focus:text-table-t-stronger'
const defaultClassName = 'border-primary'
const errorClassName = 'border-error'

export const BooleanInputField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="w-full flex space-y-1 justify-between">
      <label className="text-xs text-table-t-stronger whitespace-nowrap self-center w-20">
        {label}
      </label>
      <select
        className={`${commonClassName} ${
          meta.touched && meta.error ? errorClassName : defaultClassName
        }`}
        autoComplete="off"
        {...field}
        {...props}
      >
        <option value=""></option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  )
}
