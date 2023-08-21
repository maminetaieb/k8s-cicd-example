import React from 'react'
import { Link } from 'react-router-dom'
import { RoundedImage } from '../modelView'

export const UserCard = ({ user }) => {
  return (
    <Link
      to={`/manage/users/${user._id}`}
      className="border border-primary rounded-md p-1 flex w-full space-x-2 hover:bg-table-seperator transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-14 h-14 text-sm">
          <RoundedImage src={user.photo} alt={user.username} />
        </div>
        <div className="text-center p-1 text-xs text-table-t-strong">
          {`${user?.firstName || ''} ${user?.lastName || ''}`}
        </div>
      </div>
      <div className="flex flex-col w-full h-full p-2 space-y-1 justify-start">
        <div className="text-base font-semibold text-primary space-x-1 flex items-center">
          <span className="capitalize">
            {`${user?.firstName || ''} ${user?.lastName || ''}`}
          </span>
          <span className="text-xs text-primary">{` - ${user.username}`}</span>
        </div>
        <div className="text-sm text-table-t-strong">
          {`User manages ${user.partners.length} partners`}
        </div>
        <div className="text-sm text-table-t-strong">
          <span> Phone number:</span>{' '}
          <span className="font-semibold">{user.phone}</span>
        </div>
      </div>
    </Link>
  )
}
