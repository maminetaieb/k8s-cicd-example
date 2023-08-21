import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  UserServices,
  PartnerServices,
  DeliveryOrderServices,
  FeedbackServices,
  ProductServices,
  OrderServices,
} from '../services'

export const useUser = ({ _id }) => {
  const query = useQuery(['user', _id], () => UserServices.getOne({ _id }))
  return query
}

export const usePartner = ({ _id }) => {
  const query = useQuery(['partner', _id], () =>
    PartnerServices.getOne({ _id })
  )
  return query
}

export const useProduct = ({ _id }) => {
  const query = useQuery(['product', _id], () =>
    ProductServices.getOne({ _id })
  )
  return query
}

export const useOrder = ({ _id }) => {
  const query = useQuery(['order', _id], () => OrderServices.getOne({ _id }))
  return query
}

export const useDeliveryOrder = ({ _id }) => {
  const query = useQuery(['delivery-order', _id], () =>
    DeliveryOrderServices.getOne({ _id })
  )
  return query
}

export const useFeedback = ({ _id }) => {
  const query = useQuery(['feedback', _id], () =>
    FeedbackServices.getOne({ _id })
  )
  return query
}

export const useRemoveFeedback = ({ id, onSuccess, onError }) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    'remove-feedback',
    () => FeedbackServices.deleteOne({ _id: id }),
    {
      onSuccess: () => {
        onSuccess()
        queryClient.resetQueries('feedbacks')
      },
      onError: () => {
        onError()
      },
    }
  )

  return mutation
}
