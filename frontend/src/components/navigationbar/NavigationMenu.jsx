import React, { useEffect, useRef } from 'react'
import { useTopStore } from '../../stores'

export const NavigationMenu = ({ children }) => {
  const setToggle = useTopStore((state) => state.setToggle)
  const ref = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      // click is outside the menu
      if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false)
      }
    })
    return document.removeEventListener('mousedown', (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className="hidden z-50 shadow-lg md:flex w-48 bg-navbars-sidebar items-stretch flex-col rounded-md border border-navbars-seperator-active py-2"
      onClick={() => setToggle(false)}
    >
      {children}
    </div>
  )
}
