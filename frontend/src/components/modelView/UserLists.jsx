import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const RoundedImage = ({ src, alt }) => {
  const [isError, setIsError] = useState(false)
  return (
    <div className="rounded-full w-full h-full border border-table-seperator flex-shrink-0">
      {src && !isError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full"
          onError={(e) => {
            setIsError(true)
            // e.target.onError = undefined
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-table-seperator text-xs text-center rounded-full">
          N/A
        </div>
      )}
    </div>
  )
}

export const WorkTimesItem = ({ partner, from, to, holiday }) => {
  return (
    <div className="bg-table-header border-b border-table-seperator p-2 flex items-center w-full space-x-2 hover:bg-table-seperator transition-colors duration-200">
      <div className="flex flex-col items-center justify-evenly">
        <div className="w-20 h-20">
          <RoundedImage src={partner.profileImage} alt={partner} />
        </div>
        <div className="text-xs text-table-t-weak text-center">
          {partner.partnerName}
        </div>
      </div>
      <div className="text-sm text-table-t-stronger flex-col align-center justify-evenly">
        <div className="">
          From <span className="text-success">{from || 'N/A'}</span>
        </div>
        <div className="">
          To <span className="text-success">{to || 'N/A'}</span>
        </div>
      </div>
      {holiday === null || holiday === undefined ? (
        <></>
      ) : (
        <div className="text-base flex align-center justify-center">
          {holiday ? (
            <div className="text-success">Holiday</div>
          ) : (
            <div className="text-error">Not a Holiday</div>
          )}
        </div>
      )}
    </div>
  )
}

export const BreaksItem = (props) => {
  return <WorkTimesItem {...props} />
}

// for workplaces, partners
export const PartnerListItem = ({ partner }) => {
  return (
    <Link
      to={`/manage/partners/${partner._id}`}
      className="bg-table-header border-b border-table-seperator p-2 flex items-center w-full space-x-2 hover:bg-table-seperator transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 ">
          <RoundedImage src={partner.profileImage} alt={partner} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-base font-semibold text-table-t-stronger">
          {partner.partnerName}
        </div>
        <div className="text-sm text-table-t-strong">{partner.description}</div>
      </div>
    </Link>
  )
}

export const ListPlaceholder = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center text-base text-table-t-weak font-semibold text-center">
      {children}
    </div>
  )
}
