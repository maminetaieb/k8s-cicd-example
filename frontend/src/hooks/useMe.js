import { useQuery } from 'react-query'
import { AuthServices } from '../services'

export const useMe = () => {
  const query = useQuery('me', () => AuthServices.me())

  return query
}
