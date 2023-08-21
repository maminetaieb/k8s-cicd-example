import React from 'react'
import { routing } from '../../config'
import { ContainerButton } from '../../components/modelView'
export const Overview = () => {
  return (
    <div className="w-full md:h-full min-h-full flex flex-col items-center space-y-5">
      <div className="w-full bg-secondary flex py-5 px-2 shadow-md">
        <div className="text-3xl font-semibold text-page-background p-5">
          <div>Management</div>
          <div className="text-xs font-light">
            Manage system and database models
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-start justify-center pb-5">
        <div className="w-full grid gap-3 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-w-screen-md px-4">
          {routing.sections
            .find((section) => section.title === 'Management')
            .routes.map((route) => {
              if (route.title === 'Overview') return null
              return <ContainerButton key={route.to} {...route} />
            })}
        </div>
      </div>
    </div>
  )
}
