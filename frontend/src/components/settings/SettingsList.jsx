import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { settings } from '../../config'

export const SettingsList = () => {
  const { path } = useRouteMatch()

  return (
    <div className="w-full grid grid-cols-1 gap-1 bg-page-background border-table-seperator rounded-t border font-light rounded-sm">
      <div className="w-full bg-table-row-header px-2 py-3 text-lg font-medium hover:bg-table-row-light text-center">
        Settings
      </div>
      {settings.routes.map((route) => (
        <NavLink
          key={route.to}
          to={`${path}${route.to}`}
          exact={route.exact}
          className="w-full bg-table-row-dark px-2 py-3 text-base text-table-t-stronger flex items-center space-x-2 hover:bg-table-row-light"
          activeClassName="border-l-2 border-secondary bg-table-header"
        >
          <route.icon
            className="w-8 h-8 fill-current text-secondary flex-shrink-0"
            key={route.to}
          />
          <div className="text-table-t-stronger">{route.title}</div>
        </NavLink>
      ))}
    </div>
  )
}
