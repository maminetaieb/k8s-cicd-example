import React from 'react'
import { Switch, Route } from 'react-router'
import { Sidebar, NavigationBar } from '../components'
import { Overview } from './Overview'
import { AuditLog } from './AuditLog'
import { Settings } from './settings'

import { Manage } from './manage'
import { Analytics } from './analytics'
import { Locate } from './locate'

/*
  This is the main content of the app
 */
export const MainView = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavigationBar />
        <main className="flex-1 w-full h-full h-min-full z-0 overflow-y-scroll scrollbar-thin bg-page-background scrollbar-thumb-scrollbar scrollbar-thumb-rounded text-page-text">
          <Switch>
            <Route path="/manage">
              <Manage />
            </Route>
            <Route path="/analytics">
              <Analytics />
            </Route>
            <Route path="/locate">
              <Locate />
            </Route>
            <Route path="/audit-log">
              <AuditLog />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Overview />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  )
}
