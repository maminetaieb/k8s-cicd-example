import React from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { SettingsList } from '../../components/settings'
import { Keys, Profile, Sessions } from '.'

export const Settings = () => {
  const { path } = useRouteMatch()
  const location = useLocation()

  return (
    <div className="w-full h-full p-2 md:px-2 flex flex-col">
      <div className="flex md:flex-row flex-col">
        <div className="md:sticky md:w-1/3 w-full md:max-w-lg px-2 md:px-0">
          <SettingsList />
        </div>
        <div className="w-full md:max-w-xl mx-auto">
          <Switch location={location} key={location.pathname}>
            <Route exact path={`${path}/`}>
              <Profile />
            </Route>
            <Route exact path={`${path}/sessions`}>
              <Sessions />
            </Route>
            <Route exact path={`${path}/configuration`}>
              <Keys />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}
