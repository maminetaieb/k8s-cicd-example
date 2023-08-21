import React from 'react'
import { useNavStore, useAuthStore } from '../../stores'
import { ToggleButton } from './ToggleButton'
import { Link } from 'react-router-dom'
import { NavigationMenuButton, MenuButton } from '../navigationbar'
import BackgroundFull from '../../assets/images/navbars/background-full.svg'

import LogoFull from '../../assets/images/navbars/logo-full.svg'
import {
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineHistory,
} from 'react-icons/ai'

const NavModal = ({ children }) => {
  const toggled = useNavStore((state) => state.toggled)
  const logout = useAuthStore((state) => state.logout)
  const setToggle = useNavStore((state) => state.setToggle)

  return (
    <>
      {toggled && (
        <div className="fixed bg-navbars-sidebar md:hidden w-full h-full flex flex-col items-center justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-scrollbar scrollbar-thumb-rounded z-50">
          <div className="fixed top-3 right-3">
            <ToggleButton />
          </div>
          <Link to="/" onClick={() => setToggle(false)} className="py-3 w-full">
            <img
              className="h-16 block md:hidden p-2 mt-2 w-full"
              src={LogoFull}
              alt="logo"
            ></img>
          </Link>
          <div className="px-5 py-5 w-full flex items-center justify-around">
            <div>
              <NavigationMenuButton
                to="/settings"
                onClick={() => setToggle(false)}
              >
                <AiOutlineSetting className="w-6 h-6" />
              </NavigationMenuButton>
            </div>
            <div>
              <NavigationMenuButton
                to="/audit-log"
                onClick={() => setToggle(false)}
              >
                <AiOutlineHistory className="w-6 h-6" />
              </NavigationMenuButton>
            </div>
            <div>
              <MenuButton
                onClick={() => {
                  setToggle(false)
                  logout()
                }}
              >
                <AiOutlineLogout className="w-6 h-6" />
              </MenuButton>
            </div>
          </div>
          <div className="container px-5 z-10">{children}</div>
          <div className="fixed w-full bottom-0 inset-x-0 z-0">
            <img src={BackgroundFull} alt="" className="w-full opacity-30" />
          </div>
        </div>
      )}
    </>
  )
}

export default NavModal
