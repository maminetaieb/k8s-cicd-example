import React from 'react'
import { Link } from 'react-router-dom'

export const Section = ({ title, description, image, to }) => {
  return (
    <Link to={to}>
      <div className="shadow-inner w-full p-5 flex items-center justify-between border-b hover:shadow-lg duration-300 transition">
        <div className="flex flex-col py-24 space-y-2">
          <div className="text-2xl text-table-t-stronger font-semibold capitalize whitespace-nowrap">
            {title}
          </div>
          <div className="text-base text-table-t-strong">{description}</div>
        </div>
        <div className="min-w-max w-1/3 h-full">
          <img src={image} alt={title} className="w-full h-full p-5 max-w-sm" />
        </div>
      </div>
    </Link>
  )
}
