import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavStore, useSideStore } from '../../stores'

const common =
  'md:hover:bg-navbars-button-hover transition-all duration-300 ease-in-out bg-transparent outline-none focus:outline-none text-navbars-text shadow-none focus:shadow-none overflow-x-hidden'

const expandedClass = 'block px-4 py-2 mt-2 text-sm font-semibold '
const expandedActiveClass =
  'font-bold bg-navbars-button-active text-navbars-text-active md:hover:bg-navbars-button-active'

const collapsedClass = 'flex items-center justify-center h-sidebar w-sidebar'
const collapsedActiveClass =
  'bg-navbars-button-active text-navbars-text-active md:hover:bg-navbars-button-active'

export const SidebarButton = ({ title, children, to, exact = false }) => {
  const setToggle = useNavStore((state) => state.setToggle)
  const expanded = useSideStore((state) => state.expanded)

  return (
    <NavLink
      className={`${common} ${expanded ? expandedClass : collapsedClass}`}
      activeClassName={`${
        expanded ? expandedActiveClass : collapsedActiveClass
      }`}
      to={to}
      exact={exact}
      onClick={() => setToggle(false)}
    >
      <div
        className={
          expanded ? 'flex flex-row items-center justify-start flex-nowrap' : ''
        }
      >
        <div className={expanded ? 'px-2' : ''}>{children}</div>
        <div
          className={`whitespace-nowrap ${
            expanded ? '' : 'hidden whitespace-nowrap'
          }`}
        >
          {title}
        </div>
      </div>
    </NavLink>
  )
}
