import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { Input } from './Input'
import { SubmitButton } from './Buttons'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import { AuthServices } from '../../services'
import { ActionMessage } from './ActionMessage'

const settingsSchema = Yup.object().shape({
  oldPassword: Yup.string().min(1).required('Current password is required'),
  newPassword: Yup.string().min(10).required('New password is Required'),
  confirmPassword: Yup.string().when('newPassword', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('newPassword')],
      "Password doesn't match"
    ),
  }),
})

export const Password = () => {
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const mutation = useMutation(
    (password) => AuthServices.updatePassword(password),
    {
      onSuccess: (data) => {
        setMessage(data?.message || 'Password updated successfully.')
        setIsError(false)
      },
      onError: (data) => {
        setMessage(
          data?.data?.response?.data?.error || 'Error updating password.'
        )
        setIsError(true)
      },
    }
  )

  return (
    <div className="w-full flex items-center justify-center">
      {
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={settingsSchema}
          onSubmit={async (values, { resetForm }) => {
            setMessage(null)
            mutation.mutate(values)
            resetForm()
          }}
        >
          {({ errors, isSubmitting, touched }) => (
            <Form className="w-full container">
              <div className="flex flex-col space-y-1">
                {message && (
                  <ActionMessage message={message} isError={isError} />
                )}
                <Input
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                />
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <div className="flex items-center justify-between space-x-2">
                  <div className="text-xs text-table-t-weak">
                    Pick a strong password that you don't use anywhere else. In
                    case you lose your password please contact your system
                    administrator.
                  </div>
                  <SubmitButton
                    label="Save"
                    loading={mutation.isLoading}
                    disabled={
                      isSubmitting ||
                      (errors.oldPassword && touched.oldPassword) ||
                      (errors.newPassword && touched.newPassword) ||
                      (errors.confirmPassword && touched.confirmPassword)
                    }
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      }
    </div>
  )
}
