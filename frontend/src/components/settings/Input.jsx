import React from 'react'
import { useField } from 'formik'

const commonClassName =
  'w-full px-2 py-1 pr-5 mr-2 flex items-center border rounded focus:outline-none text-base text-table-t-strong focus:text-table-t-stronger  placeholder-table-t-weak'
const defaultClassName = 'border-primary'
const errorClassName = 'border-error'

export const Input = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props) // eslint-disable-line

  return (
    <div className="w-full flex flex-col">
      <label className="text-sm text-table-t-stronger font-medium  whitespace-nowrap capitalize mb-1">
        {label}
      </label>
      <div className="w-full">
        <input
          className={`${commonClassName} ${
            meta.touched && meta.error ? errorClassName : defaultClassName
          }`}
          autoComplete="off"
          type="text"
          placeholder={`${label}`}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-xs text-error">{meta.error}</div>
      ) : null}
    </div>
  )
}
