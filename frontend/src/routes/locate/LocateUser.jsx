import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { LocationCodeInput, Map, UserCard } from '../../components/trackUser'
import { useUserLocation } from '../../hooks'
import qs from 'qs'

export const LocateUser = () => {
  const [locationCode, setLocationCode] = useState('')
  const { data, isLoading, isError } = useUserLocation({ locationCode })

  const { search } = useLocation()

  useEffect(() => {
    const { code } = qs.parse(search, {
      ignoreQueryPrefix: true,
    })
    setLocationCode(code)
  }, [search])

  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-4 space-y-4">
      <div className="flex items-center text-2xl text-secondary font-semibold self-start">
        Locate User
      </div>

      <div className="w-full flex-col max-w-4xl space-y-2 pb-4">
        <LocationCodeInput setLocationCode={setLocationCode} />
        {data?.user && <UserCard user={data.user} />}
        <Map
          location={data?.location}
          locationCode={locationCode}
          isLoadingLocation={isLoading}
          isErrorLocation={isError}
        ></Map>
      </div>
    </div>
  )
}
