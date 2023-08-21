import React from 'react'
import { SessionItem, DangerButton } from '../../components/settings'
import { useSessions } from '../../hooks'

import { AiOutlineLoading } from 'react-icons/ai'
import { useMutation } from 'react-query'
import { AuthServices } from '../../services'
import { useAuthStore } from '../../stores'

export const Sessions = () => {
  const { data, isLoading, isError } = useSessions()
  const logout = useAuthStore((state) => state.logout)
  const mutation = useMutation(
    'revoke_all_sessions',
    () => AuthServices.revokeAllSessions(),
    {
      onSuccess: () => {
        logout({ reason: 'Your session was revoked.' })
      },
    }
  )

  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3 space-y-3 flex flex-col">
      <div className="flex items-center w-full text-2xl text-table-t-stronger font-semibold">
        Manage Sessions
      </div>
      <hr className="w-full" />
      <div className="flex items-center">
        <div className="text-sm text-table-t-weak">
          Revoke any sessions you do not recognize. If you revoke your current
          session you will be logged out.
        </div>
        <div className="justify-self-end">
          <DangerButton
            label="Revoke all Sessions"
            onClick={() => {
              mutation.mutate()
            }}
          />
        </div>
      </div>
      <hr className="w-full" />
      <div className="w-full flex-col items-center space-y-1">
        {isLoading ? (
          <AiOutlineLoading className="w-10 h-10 animate-spin justify-self-center" />
        ) : isError ? (
          <div className="text-base text-error text-center">
            Failed Loading Sessions.
          </div>
        ) : (
          data.tokens
            .sort(
              (first, second) =>
                new Date(second.lastActive) - new Date(first.lastActive)
            )
            .map((session) => <SessionItem key={session.token} {...session} />)
        )}
      </div>
    </div>
  )
}
