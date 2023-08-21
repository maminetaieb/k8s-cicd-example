import React from 'react'
import HomeArt from '../assets/images/home-art.svg'
import LocationArt from '../assets/images/location-art.svg'
import AnalyticsArt from '../assets/images/analytics-art.svg'
import ManagementArt from '../assets/images/management-art.svg'
import { useMe } from '../hooks'
import { Section } from '../components/home'

export const Overview = () => {
  const { data, isLoading } = useMe()
  return (
    <div className="w-full min-h-full flex flex-col">
      <div className="w-full h-full bg-secondary flex flex-col md:flex-row items-center justify-evenly pt-2 px-2">
        <div className="text-3xl font-semibold text-page-background flex-col flex p-5 my-auto py-20">
          {isLoading ? (
            <div></div>
          ) : (
            <>
              <div>{`Welcome, ${data.displayName || data.username} 👋`}</div>
              <div className="text-xs font-light">
                {data.lastLogin
                  ? `Your last login was on ${new Date(
                      data.lastLogin
                    ).toDateString()} at ${new Date(
                      data.lastLogin
                    ).toTimeString()}.`
                  : 'This is the first time you log in.'}
              </div>
            </>
          )}
        </div>
        <img
          src={HomeArt}
          alt=""
          className="h-full max-h-login-container md:w-auto mt-auto md:self-end md:justify-self-end justify-self-center"
        />
      </div>

      <Section
        title="Manage System"
        description="Find, filter and manage users, partners, orders, delivery orders, products, feedback and more."
        image={ManagementArt}
        to="/manage"
      />
      <Section
        title="Analytics"
        description="View the latest and overall system analytics, financial analytics and social media analytics."
        image={AnalyticsArt}
        to="/analytics"
      />
      <Section
        title="Locate"
        description="Locate and find users on an interactive map using their location code."
        image={LocationArt}
        to="/locate/user"
      />
    </div>
  )
}
