import React from 'react'
import { DangerButton } from '../settings/Buttons'
import { FaBan, FaCheck } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const SuspendButton = ({ isSuspended, onClick, isLoading = false }) => {
  return isLoading ? (
    <DangerButton className="max-h-10 cursor-not-allowed">
      <div className="flex items-center whitespace-nowrap space-x-2 text-background">
        <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
      </div>
    </DangerButton>
  ) : !isSuspended ? (
    <DangerButton className="max-h-10" onClick={onClick}>
      <div className="flex items-center whitespace-nowrap space-x-2 text-background">
        <FaBan className="w-5 h-5" />
        <div>Ban</div>
      </div>
    </DangerButton>
  ) : (
    <DangerButton className="max-h-10" onClick={onClick}>
      <div className="flex items-center whitespace-nowrap space-x-2 text-background">
        <FaCheck className="w-5 h-5" />
        <div>Unban</div>
      </div>
    </DangerButton>
  )
}
