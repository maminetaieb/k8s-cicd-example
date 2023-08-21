import React from 'react'
import { AiOutlineAlert, AiOutlineCheckCircle } from 'react-icons/ai'

const commonClassName =
  'w-full py-2 px-2 text-base border rounded flex items-center space-x-1'
const errorClassName = `${commonClassName} text-error border-error`
const successClassName = `${commonClassName} text-success border-success`

export const ActionMessage = ({ message, isError }) => {
  return (
    <div className={isError ? errorClassName : successClassName}>
      <div>
        {isError ? (
          <AiOutlineAlert className="w-5 h-5" />
        ) : (
          <AiOutlineCheckCircle className="w-5 h-5" />
        )}
      </div>
      <div>{message}</div>
    </div>
  )
}
