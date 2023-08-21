import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { Input } from './Input'
import { SubmitButton } from './Buttons'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from 'react-query'
import { useConfiguration } from '../../hooks'
import { ConfigServices } from '../../services'
import { ActionMessage } from './ActionMessage'
import { ErrorScreen, LoadingScreen } from '../modelView'

const configSchema = Yup.object().shape({
  googleKey: Yup.string().min(10),
  instagramId: Yup.string().min(2).max(30),
})

export const ApiKeys = () => {
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const { data, isLoading, isLoadingError } = useConfiguration()

  const queryClient = useQueryClient()
  const mutation = useMutation((values) => ConfigServices.update(values), {
    onSuccess: (data) => {
      setMessage(data?.message || 'Keys updated successfully.')
      setIsError(false)
      queryClient.invalidateQueries('configuration')
    },
    onError: (data) => {
      setMessage(data?.data?.response?.data?.error || 'Error updating keys.')
      setIsError(true)
    },
  })

  return (
    <div className="w-full flex items-center justify-center">
      {isLoading ? (
        <LoadingScreen />
      ) : isLoadingError ? (
        <ErrorScreen>Failed accessing API key settings.</ErrorScreen>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            instagramId: data?.instagramId || '',
            googleKey: data?.googleKey || '',
          }}
          validationSchema={configSchema}
          onSubmit={async (values) => {
            setMessage(null)
            mutation.mutate(values)
          }}
        >
          {({ errors, isSubmitting, touched }) => (
            <Form className="w-full container">
              <div className="flex flex-col space-y-1">
                {message && (
                  <ActionMessage message={message} isError={isError} />
                )}
                <Input label="Instagram username" name="instagramId" />
                <Input label="Google Map API key" name="googleKey" />
                <div className="flex items-center justify-between space-x-2">
                  <div className="text-xs text-table-t-weak">
                    You can generate your google maps API key{' '}
                    <a
                      href="https://developers.google.com/maps/documentation/javascript/get-api-key"
                      rel="noreferrer"
                      target="_blank"
                      className="text-secondary underline"
                    >
                      {'here'}
                    </a>
                    {
                      '. Make sure you link a billing account so you can use the API.'
                    }
                  </div>
                  <SubmitButton
                    label="Save"
                    loading={mutation.isLoading}
                    disabled={
                      isSubmitting ||
                      (errors.instagramId && touched.instagramId) ||
                      (errors.googleKey && touched.googleKey)
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
