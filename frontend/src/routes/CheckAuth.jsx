import { Redirect, Switch, useLocation } from 'react-router'
import { Login } from './Login'
import { useAuthStore } from '../stores'
import { MainView } from './MainView'
import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { LoadingScreen } from '../components'
import { useQueryClient } from 'react-query'
/*
This route will check if a key exist and if the user is authenticated, while doing that it will display a loading indicator
*/

export const CheckAuth = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn)
  const fetchRefreshToken = useAuthStore((state) => state.fetchRefreshToken)
  const fetchingToken = useAuthStore((state) => state.fetchingToken)
  const { pathname, search } = useLocation()
  const [redirectUrl, setRedirectUrl] = useState()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (pathname !== '/login') setRedirectUrl(`${pathname}${search}`)
    fetchRefreshToken()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (loggedIn) {
      setRedirectUrl(null)
    }
    if (!loggedIn) {
      queryClient.clear()
    }
  }, [loggedIn, queryClient])

  return (
    <Switch>
      {loggedIn ? (
        <>
          <Route path="/login">
            <Redirect to={redirectUrl ? redirectUrl : '/'}></Redirect>
          </Route>
          <Route path="/">
            <MainView />
          </Route>
        </>
      ) : fetchingToken ? (
        <LoadingScreen />
      ) : (
        <>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <Redirect
              to={{
                pathname: '/login',
                search: `${redirectUrl ? `?to=${redirectUrl}` : ''}`,
              }}
            ></Redirect>
          </Route>
        </>
      )}
    </Switch>
  )
}
