import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

const commonClassName =
  'focus:outline-none rounded-md border text-sm px-6 w-20 h-8 text-sm flex items-center justify-center transition duration-200'

const SubmitButtonClassName =
  'text-page-background bg-secondary hover:bg-table-pagination-button-active border-secondary'

const disabledButtonClassName =
  'cursor-not-allowed cursor-not-allowed bg-opacity-20 hover:bg-opacity-20 border-opacity-20'

const loadingButtonClassName = 'cursor-not-allowed'

export const SubmitButton = ({ label, loading, disabled, ...props }) => {
  return (
    <button
      {...props}
      type="submit"
      disabled={disabled || loading}
      className={`${commonClassName} ${SubmitButtonClassName} ${
        disabled && disabledButtonClassName
      } ${loading && loadingButtonClassName}`}
    >
      {loading ? <AiOutlineLoading className="animate-spin w-10" /> : label}
    </button>
  )
}

export const DangerButton = ({ label, children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${className} text-page-background z-10 whitespace-nowrap shadow focus:outline-none px-2 p-1 transition-colors bg-error hover:bg-error-hover hover:border-error-hover rounded-md border border-error text-sm`}
    >
      {label}
      {children}
    </button>
  )
}

export const PrimaryButton = ({ label, children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${className} text-page-background z-10 whitespace-nowrap shadow focus:outline-none px-2 p-1 transition-colors bg-primary rounded-md border border-primary text-sm`}
    >
      {label}
      {children}
    </button>
  )
}

export const CancelDangerButton = ({ label, ...props }) => {
  return (
    <button
      {...props}
      className="text-error z-10 hover:bg-opacity-80 border-error"
    >
      {label}
    </button>
  )
}
