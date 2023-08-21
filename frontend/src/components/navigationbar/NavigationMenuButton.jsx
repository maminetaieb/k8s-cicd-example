import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavigationMenuButton = ({ title, to, children, onClick }) => {
  return (
    <NavLink
      className="w-full transition duration-200 text-navbars-text py-2 px-4 hover:text-navbars-text-hover hover:bg-navbars-button-hover cursor-pointer flex items-center"
      activeClassName="bg-navbars-button-active text-navbars-text-hover"
      to={to}
      onClick={onClick}
    >
      <div className="px-2">{children}</div>
      {title && <div className="text-base">{title}</div>}
    </NavLink>
  )
}
