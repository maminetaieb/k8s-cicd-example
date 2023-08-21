import { useQuery } from 'react-query'
import { AuthServices } from '../services'

export const useSessions = () => {
  const query = useQuery('sessions', () => AuthServices.getSessions())
  return query
}
