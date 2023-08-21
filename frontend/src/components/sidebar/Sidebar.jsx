import React from 'react'
import { Link } from 'react-router-dom'
import { SidebarButton } from './SidebarButton'
import { ToggleButton } from './ToggleButton'
import { SidebarSection } from './SidebarSection'
import NavModal from './NavModal'
import { routing } from '../../config'
import { SidebarFooter } from './SidebarFooter'
import { useSideStore } from '../../stores'
import { Overview } from '../../assets/images/icons'

import Logo from '../../assets/images/navbars/logo.svg'
import LogoFull from '../../assets/images/navbars/logo-full.svg'
import Background from '../../assets/images/navbars/background.svg'
import BackgroundFull from '../../assets/images/navbars/background-full.svg'

const SideBarContent = () => (
  <>
    <SidebarButton key={-1} title="Home" to="/" exact={true}>
      <Overview alt="" className="w-8 h-8 text-background fill-current" />
    </SidebarButton>
    {routing.sections.map((section, index) => (
      <SidebarSection key={index} title={section.title}>
        {section.routes.map((button, index) => (
          <SidebarButton
            key={index}
            title={button.title}
            to={button.to}
            exact={button.exact}
          >
            <button.icon
              alt=""
              className="w-8 h-8 text-background fill-current"
            />
          </SidebarButton>
        ))}
      </SidebarSection>
    ))}
  </>
)

export const Sidebar = () => {
  const expanded = useSideStore((state) => state.expanded)

  return (
    <aside
      className={`sticky transition-all duration-300 ease-in-out top-0 flex flex-col w-full md:${
        expanded ? 'w-64' : 'w-sidebar'
      } md:h-full bg-navbars-sidebar flex-shrink-0 md:max-w-xs text-navbars-text group select-none shadow-lg z-50`}
    >
      <div className=" z-10 flex-shrink-0 w-full h-navbar px-2 flex flex-row items-center justify-between md:justify-center bg-navbars-sidebar sticky top-0">
        <Link to="/" className="h-navbar focus:outline-none">
          <img
            className={`h-navbar hidden md:block ${expanded ? 'p-2' : 'p-1'}`}
            src={expanded ? LogoFull : Logo}
            alt="logo"
          ></img>
          <img
            className="h-navbar block md:hidden p-3"
            src={LogoFull}
            alt="logo"
          ></img>
        </Link>
        <ToggleButton />
      </div>
      <nav className="flex-grow overflow-hidden hidden md:flex md:flex-col z-10">
        <div
          className={`overflow-y-scroll scrollbar-track-transparent overflow-x-hidden flex-1 scrollbar-thin transition-all duration-200 ${
            expanded
              ? 'scrollbar-thin group-hover:scrollbar-thumb-scrollbar scrollbar-thumb-transparent scrollbar-track-transparent scrollbar-thumb-rounded'
              : 'scrollbar-thumb-transparent scrollbar-track-transparent'
          }`}
        >
          <SideBarContent />
        </div>
        <SidebarFooter />
      </nav>
      <NavModal>
        <SideBarContent />
      </NavModal>
      <div className="absolute w-full bottom-0 inset-x-0 z-0">
        <img
          src={expanded ? BackgroundFull : Background}
          alt=""
          className="w-full"
        />
      </div>
    </aside>
  )
}
