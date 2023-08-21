import { useQuery } from 'react-query'
import { ConfigServices } from '../services'

export const useConfiguration = () => {
  const query = useQuery('configuration', () => ConfigServices.get())
  return query
}
