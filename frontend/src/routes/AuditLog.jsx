import React, { useState } from 'react'
import { LogList, LogItem } from '../components/log'
import { ErrorScreen, LoadingScreen } from '../components/modelView'
import { SearchField } from '../components/table'
import { PrimaryButton } from '../components'
import { useLog } from '../hooks'

export const AuditLog = () => {
  const [searchFilter, setSearchFilter] = useState(null)

  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useLog({
    pageSize: 50,
    sortBy: [{ id: 'createdAt', desc: 1 }],
    searchFilter,
  })

  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-4 space-y-4">
      <div className="flex items-center self-start text-2xl text-secondary font-semibold">
        Audit Security Log
      </div>
      <div className="flex items-center self-start">
        <SearchField search={searchFilter} setSearch={setSearchFilter} />
      </div>
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>Could not load Log.</ErrorScreen>
      ) : (
        <div className="w-full max-w-screen-md self-center flex flex-col items-stretch">
          <LogList>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.docs.map((log) => (
                  <LogItem key={log._id} {...log} />
                ))}
              </React.Fragment>
            ))}
          </LogList>
          <PrimaryButton
            className="self-end my-2"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
