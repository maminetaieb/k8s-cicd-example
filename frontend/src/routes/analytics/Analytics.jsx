import React from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { Overview, Partners, Orders, Finance, SocialMedia } from '.'

export const Analytics = () => {
  const { path } = useRouteMatch()
  const location = useLocation()

  return (
    <Switch location={location} key={location.pathname}>
      <Route exact path={`${path}/`}>
        <Overview />
      </Route>
      <Route exact path={`${path}/partners`}>
        <Partners />
      </Route>
      <Route exact path={`${path}/orders`}>
        <Orders />
      </Route>
      <Route exact path={`${path}/financial`}>
        <Finance />
      </Route>
      <Route exact path={`${path}/social-media`}>
        <SocialMedia />
      </Route>
    </Switch>
  )
}
