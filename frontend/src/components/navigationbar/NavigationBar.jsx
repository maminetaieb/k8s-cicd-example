import React from 'react'
import { useAuthStore, useTopStore } from '../../stores'
import { NavigationButton } from './NavigationButton'
import { NavigationMenu } from './NavigationMenu'
import { MenuButton } from './MenuButton'
import { NavigationMenuButton } from './NavigationMenuButton'
import {
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineHistory,
} from 'react-icons/ai'
import { useMe } from '../../hooks'

export const NavigationBar = () => {
  const toggled = useTopStore((state) => state.toggled)
  const logout = useAuthStore((state) => state.logout)
  const { isLoading, data } = useMe()

  return (
    <nav className="sticky shadow-lg w-full h-navbar z-10 bg-navbars-topbar hidden select-none md:flex items-center space-x-2 justify-end top-0 right-0">
      <div className="text-base text-page-background font-semibold px-2 capitalize">
        {isLoading ? null : data.displayName || data.username}
      </div>
      <NavigationButton />

      {toggled && (
        <div className="fixed right-2 top-navbar">
          <NavigationMenu>
            <NavigationMenuButton title="Settings" to="/settings">
              <AiOutlineSetting className="w-6 h-6" />
            </NavigationMenuButton>
            <NavigationMenuButton title="Audit Log" to="/audit-log">
              <AiOutlineHistory className="w-6 h-6" />
            </NavigationMenuButton>
            <MenuButton
              title="Logout"
              onClick={() => {
                logout({})
              }}
            >
              <AiOutlineLogout className="w-6 h-6" />
            </MenuButton>
          </NavigationMenu>
        </div>
      )}
    </nav>
  )
}
