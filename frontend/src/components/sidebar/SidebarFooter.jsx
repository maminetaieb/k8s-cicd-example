import React from 'react'
import { useSideStore } from '../../stores'
import { BsChevronLeft } from 'react-icons/bs'

const footerClass = {
  expanded: 'justify-right',
  collpased: 'justify-center',
}

export const SidebarFooter = () => {
  const expanded = useSideStore((state) => state.expanded)
  const toggle = useSideStore((state) => state.toggle)

  return (
    <div
      onClick={toggle}
      className={`w-full h-navbar flex flex-row items-center justify-center sticky bottom-0 bg-transparent  hover:bg-navbars-button-hover focus:outline-none cursor-pointer  ${
        expanded ? footerClass.expanded : footerClass.collpased
      }`}
    >
      <div className="hover:text-navbars-text-active hover:bg-navbars-button-hover focus:outline-none">
        <BsChevronLeft
          className={`self-center transform  transition duration-300 ${
            expanded ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </div>
    </div>
  )
}
