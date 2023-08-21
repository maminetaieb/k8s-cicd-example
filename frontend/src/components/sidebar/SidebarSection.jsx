import React, { useState, useEffect } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { useSideStore } from '../../stores'

export const SidebarSection = ({ children, title }) => {
  const [toggled, setToggled] = useState(false)
  const expanded = useSideStore((state) => state.expanded)
  const { pathname } = useLocation()

  useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (pathname === child.props.to) {
        setToggled(true)
      }
    })
  }, [pathname, children])

  return expanded ? (
    <div className="block text-sm font-semibold text-navbars-text bg-transparent">
      <div
        onClick={() => setToggled(!toggled)}
        className="py-4 md:hover:text-navbars-text-hover md:hover:bg-navbars-button-hover transition duration-300 cursor-pointer focus:outline-none focus:shadow-none"
      >
        <div className="text-base flex justify-between px-3 items-start text-opacity-80">
          <div className="whitespace-nowrap">{title}</div>
          <HiChevronLeft
            className={`block h-4 w-4 self-center transform  transition duration-300  ${
              toggled ? '-rotate-90' : 'rotate-0'
            }`}
          />
        </div>
      </div>
      <hr
        className={`w-full transition duration-300 ${
          toggled
            ? 'border-navbars-seperator'
            : 'border-navbars-seperator-active'
        }`}
      />
      <div className={`transition-all ${toggled ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  ) : toggled ? (
    <div className="block bg-transparent">
      {children && <hr className="border-navbars-seperator w-full" />}
      <div>{children}</div>
    </div>
  ) : (
    <></>
  )
}
