import React from 'react'

export const LogItem = ({ user, action, description, createdAt }) => {
  return (
    <div className="w-full p-4 bg-table-row-light flex flex-col text-base">
      <div className="flex justify-between font-semibold">
        <div className="text-secondary">
          {`${
            user.displayName
              ? `${user.displayName} - ${user.username}`
              : `${user.username}`
          }`}
        </div>
        <div className="text-error font-mono">{action}</div>
      </div>
      <div className="text-sm text-table-t-strong w-full">{description}</div>
      <div className="text-xs text-table-t-weak self-end">{createdAt}</div>
    </div>
  )
}
