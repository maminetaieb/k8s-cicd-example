import React from 'react'
import { User } from '../../assets/images/icons'
import { useTopStore } from '../../stores'

const buttonStyle = {
  base: 'text-navbars-text rounded-full focus:outline-none',
  active: '',
  inactive: 'text-gray-500 hover:text-black',
}

export const NavigationButton = () => {
  const toggled = useTopStore((state) => state.toggled)
  const toggle = useTopStore((state) => state.toggle)

  return (
    <div className="flex items-center pr-4 " onClick={toggle}>
      <button
        className={`${buttonStyle.base} ${
          toggled ? buttonStyle.active : buttonStyle.inactive
        }`}
      >
        <User alt="" className="h-7 w-7 text-background fill-current" />
      </button>
    </div>
  )
}
