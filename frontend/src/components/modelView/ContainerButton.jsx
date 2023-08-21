import React from 'react'
import { Link } from 'react-router-dom'

export const ContainerButton = ({
  className,
  icon: Icon,
  title,
  description,
  to,
}) => {
  return (
    <Link
      to={to}
      className={`hover:-translate-y-2 hover:scale-105 transform transition hover:shadow-lg rounded-lg border-table-seperator border flex flex-col space-y-1 shadow-md items-center p-2 ${className}`}
    >
      <div className="w-14 h-14 rounded-full text-secondary opacity-100">
        <Icon
          className="w-full h-full fill-current text-secondary opacity-100"
          fill="black"
        />
      </div>
      <div className="text-primary text-lg w-full text-center font-medium">
        {title}
      </div>
      <div className="text-xs text-table-t-weak w-full text-center">
        {description}
      </div>
    </Link>
  )
}
