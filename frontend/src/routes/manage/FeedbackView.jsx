import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { DangerButton } from '../../components'
import {
  ErrorScreen,
  LoadingScreen,
  RoundedImage,
  Section,
  SectionItem,
  ConfirmModal,
} from '../../components/modelView'
import { useFeedback, useRemoveFeedback } from '../../hooks'
import { FaTimes } from 'react-icons/fa'

export const FeedbackView = () => {
  const { push } = useHistory()
  const { id } = useParams()
  const { data, isLoading, isError } = useFeedback({ _id: id })
  const [modalVisible, setModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const mutation = useRemoveFeedback({
    id,
    onSuccess: () => {
      setModalVisible(false)
      push('/manage/feedback')
    },
    onError: () => {
      setModalVisible(false)
      setErrorMessage('Removing feedback failed, something went wrong.')
    },
  })

  return (
    <div className="w-full h-full px-1 py-2 md:px-5 md:py-3">
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen>
          Loading feedback failed, most likely this feedback doesn't exist.
        </ErrorScreen>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="text-2xl text-secondary font-semibold capitalize">
              {`Feedback - `}
              <span className="font-mono">{data._id}</span>
            </div>
            <DangerButton onClick={() => setModalVisible(true)}>
              <div className="flex items-center whitespace-nowrap space-x-2 text-background">
                <FaTimes className="w-5 h-5" />
                <div>Remove Feedback</div>
              </div>
            </DangerButton>
          </div>
          {errorMessage && (
            <div className="w-full flex items-center justify-center text-error text-base">
              <div className="border border-error rounded-md p-3 max-w-lg">
                {errorMessage}
              </div>
            </div>
          )}
          <div className="w-full flex items-end justify-start space-x-3 pb-2 px-3">
            <div className="w-full h-full flex flex-row justify-evenly md:space-x-3">
              <div className="md:w-1/2 w-full md:max-w-md flex flex-col items-center p-2 space-y-3">
                <div className="rounded-full flex-shrink-0 w-52 h-52 border border-table-seperator">
                  <RoundedImage src={data.user.photo} alt={'profile'} />
                </div>
                <Section title="About feedback">
                  <div className="grid grid-cols-3 gap-1 p-2 w-full">
                    <SectionItem
                      title="By User"
                      value={
                        data.user ? (
                          <Link to={`/manage/users/${data.user._id}`}>
                            <span className="text-secondary text-semibold underline">{`${
                              `${data.user.firstName} ${data.user.lastName}` ||
                              'N/A'
                            }`}</span>
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }
                    />
                    <SectionItem
                      title="By Deliverer"
                      value={
                        data.deliverer ? (
                          <Link to={`/manage/users/${data.deliverer._id}`}>
                            <span className="text-secondary text-semibold underline">{`${
                              `${data.deliverer.firstName} ${data.deliverer.lastName}` ||
                              'N/A'
                            }`}</span>
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }
                    />

                    <SectionItem
                      title="To Partner"
                      value={
                        data.partner ? (
                          <Link to={`/manage/partners/${data.partner._id}`}>
                            <span className="text-secondary text-semibold underline">{`${
                              data.partner.partnerName || 'N/A'
                            }`}</span>
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }
                    />
                    <SectionItem
                      title="Score"
                      value={
                        <span className="font-semibold">{data.score}</span>
                      }
                    />
                  </div>
                </Section>
                <Section title="Feedback text">
                  <div className="text-sm p-2 w-full">
                    {data.comment || 'No text'}
                  </div>
                </Section>
              </div>
            </div>
          </div>
          {modalVisible && (
            <ConfirmModal
              title="Are you sure?"
              cancel={() => setModalVisible(false)}
              confirm={() => {
                mutation.mutate()
              }}
              isLoading={mutation.isLoading}
            >
              <span className="text-table-t-stronger text-base py-2">
                By confirming you will remove this feedback. This action is
                unreversable.
              </span>
            </ConfirmModal>
          )}
        </div>
      )}
    </div>
  )
}
