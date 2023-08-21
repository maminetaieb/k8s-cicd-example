import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const LoadingScreen = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <AiOutlineLoading3Quarters className="w-8 h-8 m-auto animate-spin fill-current text-secondary" />
    </div>
  )
}

export const ErrorScreen = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-error text-lg font-semibold">{children}</div>
    </div>
  )
}
