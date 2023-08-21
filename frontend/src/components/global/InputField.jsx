import React from 'react'
import { useField } from 'formik'
import { VscRegex } from 'react-icons/vsc'
const commonClassName =
  'w-36 border-b border-r-0 border-t-0 border-l-0 px-2 py-1 pr-5 mr-2 flex items-center border focus:outline-none text-sm text-table-t-strong focus:text-table-t-stronger  placeholder-table-t-weak'
const defaultClassName = 'border-primary'
const errorClassName = 'border-error'

const RegexButton = ({ name }) => {
  const [field, meta, helpers] = useField(name) // eslint-disable-line

  const { value } = meta
  const { setValue } = helpers
  return (
    <div
      className={`w-5 h-5 absolute right-1 inset-y-0 my-auto hover:bg-table-seperator cursor-pointer ${
        value ? 'text-secondary' : 'text-table-t-weak'
      }`}
      onClick={() => setValue(!value)}
      title="Toggle Regex"
    >
      <VscRegex className="w-full" />
    </div>
  )
}

export const InputField = ({ label, ...props }) => {
  const value = `[${props.name}.value]`
  const regex = `[${props.name}.isRegex]`
  const [regexField, regexMeta] = useField(regex) // eslint-disable-line
  const [field, meta] = useField(value)

  return (
    <div className="w-full flex space-y-1 justify-between">
      <label className="text-xs text-table-t-stronger whitespace-nowrap self-center w-20">
        {label}
      </label>
      <div className="relative h-full">
        <input
          className={`${commonClassName} ${
            meta.touched && meta.error ? errorClassName : defaultClassName
          } ${regexMeta.value && field.value ? 'font-mono' : ''}`}
          autoComplete="off"
          type="text"
          placeholder={regexMeta.value ? `${label} RegEx` : `${label} value`}
          {...field}
          {...props}
          name={value}
        />
        <RegexButton name={regex} />
      </div>
    </div>
  )
}
