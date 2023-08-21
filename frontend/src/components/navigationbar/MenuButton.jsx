import React from 'react'

export const MenuButton = ({ title, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full transition duration-300 text-navbars-text py-2 px-4 hover:text-navbars-text-hover hover:bg-navbars-button-hover cursor-pointer flex items-center"
    >
      <div className="px-2">{children}</div>
      {title && <div className="text-base">{title}</div>}
    </div>
  )
}
