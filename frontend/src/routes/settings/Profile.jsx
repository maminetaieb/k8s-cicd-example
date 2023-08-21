import React from 'react'
import { DisplayName, Password } from '../../components/settings'

export const Profile = () => {
  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3 space-y-3 flex flex-col">
      <div className="flex items-center w-full text-2xl text-table-t-stronger font-semibold">
        Profile Settings
      </div>
      <hr className="w-full" />
      <div className="p-2">
        <DisplayName />
      </div>
      <hr className="w-full" />
      <div className="p-2">
        <Password />
      </div>
    </div>
  )
}
