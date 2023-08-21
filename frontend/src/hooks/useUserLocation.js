import { useQuery } from 'react-query'
import { UserServices } from '../services'

export const useUserLocation = ({ locationCode }) => {
  const query = useQuery(
    ['user-location', locationCode],
    () => UserServices.locateOne({ locationCode }),
    {
      staleTime: Infinity,
      enabled: !!locationCode,
      retry: 2,
    }
  )
  return query
}
