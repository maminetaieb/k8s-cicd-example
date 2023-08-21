import React from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { LocateUser } from '.'

export const Locate = () => {
  const { path } = useRouteMatch()
  const location = useLocation()

  return (
    <Switch location={location} key={location.pathname}>
      <Route path={`${path}/user`}>
        <LocateUser />
      </Route>
    </Switch>
  )
}
