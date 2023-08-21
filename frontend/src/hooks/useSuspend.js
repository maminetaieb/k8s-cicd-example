import { useMutation, useQueryClient } from 'react-query'
import { PartnerServices, UserServices } from '../services'

export const useSuspendUser = ({ id, value, onSuccess }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    'suspend-user',
    () => UserServices.suspend({ _id: id, value }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', id])
        onSuccess()
      },
    }
  )

  return mutation
}

export const useSuspendPartner = ({ id, value, onSuccess }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    'suspend-partner',
    () => PartnerServices.suspend({ _id: id, value }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['partner', id])
        onSuccess()
      },
    }
  )

  return mutation
}
