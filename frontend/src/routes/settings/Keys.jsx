import React from 'react'
import { ApiKeys } from '../../components/settings'

export const Keys = () => {
  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3 space-y-3 flex flex-col">
      <div className="flex items-center w-full text-2xl text-table-t-stronger font-semibold">
        System Settings & configuration
      </div>
      <hr className="w-full" />
      <div className="flex items-center">
        <div className="text-sm text-table-t-weak">
          Manage your API keys and global system configuration.
        </div>
      </div>
      <hr className="w-full" />
      <div className="w-full flex-col items-center space-y-1">
        <ApiKeys />
      </div>
    </div>
  )
}
