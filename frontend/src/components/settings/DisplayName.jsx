import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { Input } from './Input'
import { SubmitButton } from './Buttons'
import * as Yup from 'yup'
import { useMe } from '../../hooks'
import { AiOutlineLoading } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'
import { AuthServices } from '../../services'
import { ActionMessage } from './ActionMessage'

const settingsSchema = Yup.object().shape({
  displayName: Yup.string().min(3).max(32),
})

export const DisplayName = () => {
  const { isLoading, data } = useMe()
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (displayName) => AuthServices.updateDisplayName(displayName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('me')
        setMessage('Display name updated successfully.')
        setIsError(false)
      },
      onError: (data) => {
        setMessage(
          data.data.response.data.error || 'Error updating display name.'
        )
        setIsError(true)
      },
    }
  )

  return (
    <div className="w-full flex items-center justify-center">
      {isLoading ? (
        <AiOutlineLoading className="animate-spin w-10 h-10" />
      ) : (
        <Formik
          enableReinitialize
          initialValues={{ displayName: data?.displayName || '' }}
          validationSchema={settingsSchema}
          onSubmit={async (values) => {
            setMessage(null)
            mutation.mutate({ displayName: values.displayName })
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className="w-full container">
              <div className="flex flex-col space-y-1">
                {message && (
                  <ActionMessage message={message} isError={isError} />
                )}
                <Input label="Display name" name="displayName" />
                <div className="flex items-center justify-between space-x-2">
                  <div className="text-xs text-table-t-weak">
                    Your name will appear around the UI and in the audit log.
                    You can remove it and have your username shown instead.
                  </div>
                  <SubmitButton
                    label="Save"
                    loading={mutation.isLoading}
                    disabled={
                      values.displayName === data.displayName || isSubmitting
                    }
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}
