import React from 'react'
import { useConfiguration } from '../../hooks'
import GoogleMapReact from 'google-map-react'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import { ErrorScreen, LoadingScreen } from '../modelView'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Marker = () => {
  return (
    <div className="w-6 h-6">
      <Logo className="w-full h-full text-secondary transform -translate-x-1/2 -translate-y-full" />
    </div>
  )
}

const NotAvailableOverlay = ({
  location,
  locationCode,
  isLoading,
  isError,
}) => {
  if (location) return null

  if (!locationCode)
    return (
      <div className="absolute top-0 left-0 w-full h-full select-none backdrop-filter backdrop-blur-sm bg-table-seperator text-lg flex items-center justify-center">
        Type in a location code
      </div>
    )

  if (isLoading && !isError)
    return (
      <div className="absolute top-0 left-0 w-full h-full flex-col select-none backdrop-filter backdrop-blur-sm bg-table-seperator text-lg flex items-center justify-center">
        <div>Loading user location</div>
        {isLoading && (
          <AiOutlineLoading3Quarters className="w-3 h-3 animate-spin" />
        )}
      </div>
    )

  if (isError || !location)
    return (
      <div className="absolute top-0 left-0 w-full h-full select-none backdrop-filter backdrop-blur-sm bg-table-seperator text-lg flex items-center justify-center">
        User location is not available
      </div>
    )
}

const TunisiaLocation = {
  lat: 33.8869,
  lng: 9.5375,
}

export const Map = ({
  location,
  locationCode,
  isLoadingLocation,
  isErrorLocation,
}) => {
  const { data, isLoading, isError } = useConfiguration()

  return (
    <div className="container h-login-container relative">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Cannot load google maps key.</ErrorScreen>
      ) : (
        <>
          <GoogleMapReact
            bootstrapURLKeys={{ key: data.googleKey }}
            defaultCenter={TunisiaLocation}
            defaultZoom={6}
            center={
              location?.latitude &&
              location?.longitude && {
                lat: location.latitude,
                lng: location.longitude,
              }
            }
            zoom={location?.latitude && location?.longitude ? 14 : 6}
          >
            {location?.latitude && location?.longitude && (
              <Marker lat={location.latitude} lng={location.longitude} />
            )}
          </GoogleMapReact>
          <NotAvailableOverlay
            location={location?.latitude && location?.longitude}
            locationCode={locationCode}
            isLoading={isLoadingLocation}
            isError={isErrorLocation}
          />
        </>
      )}
    </div>
  )
}
