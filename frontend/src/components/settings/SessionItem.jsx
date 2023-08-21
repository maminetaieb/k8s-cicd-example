import React, { useMemo } from 'react'
import { AiOutlineLaptop } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'
import { AuthServices } from '../../services'
import { useAuthStore } from '../../stores'
import { DangerButton } from './Buttons'

const tenMinutes = 10 * 60 * 1000 /* ms */

export const SessionItem = ({ token, lastActive, ipAddress }) => {
  const lastActiveDate = useMemo(() => new Date(lastActive), [lastActive])
  const isActiveLately = useMemo(() => {
    return Date.now() - lastActiveDate < tenMinutes
  }, [lastActiveDate])
  const logout = useAuthStore((state) => state.logout)
  const refreshToken = localStorage.getItem('refreshToken')
  const isCurrentSession = refreshToken === token
  const queryClient = useQueryClient()

  const mutation = useMutation(
    'revoke_session',
    () => AuthServices.revokeSession({ token }),
    {
      onSuccess: () => {
        if (isCurrentSession) logout({ reason: 'Your session was revoked.' })
      },
      onSettled: () => {
        queryClient.invalidateQueries('sessions')
      },
    }
  )

  return (
    <div className="w-full p-2 bg-gradient-to-t from-table-row-dark to-table-row-dark space-x-2 via-table-row-light flex items-center rounded border-gray-500">
      <div
        className={`w-2 h-2 p-1 rounded-full self-start ${
          isActiveLately ? 'bg-green-500' : 'bg-gray-400'
        }`}
      ></div>
      <div className="flex flex-col align-center w-16">
        <AiOutlineLaptop className="h-16 w-16 text-primary fill-current" />
        <div className="font-mono font-light text-xs text-center">
          {isCurrentSession ? 'current session' : ipAddress}
        </div>
      </div>
      <div className="text-xs text-table-t-weak">
        {`Last seen on ${lastActiveDate}`}
      </div>
      <div className="ml-auto justify-self-end">
        <DangerButton
          label="Revoke"
          onClick={() => {
            mutation.mutate()
          }}
        />
      </div>
    </div>
  )
}
