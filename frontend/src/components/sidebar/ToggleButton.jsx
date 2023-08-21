import React from 'react'
import { useNavStore, useSideStore } from '../../stores'

export const ToggleButton = () => {
  const { toggled, toggle } = useNavStore()
  const setExpanded = useSideStore((state) => state.setExpanded)

  return (
    <div>
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-navbars-text hover:text-navbars-text-hover focus:ring-navbars-text"
        aria-controls="mobile-menu"
        aria-expanded="false"
        onClick={() => {
          setExpanded(true)
          toggle()
        }}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {toggled ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </div>
  )
}
