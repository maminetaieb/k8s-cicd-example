import React, { useMemo } from 'react'
import { Form, Formik } from 'formik'
import { Input } from '../settings/Input'
import { SubmitButton } from '../settings/Buttons'
import * as Yup from 'yup'
import { useLocation } from 'react-router'
import qs from 'qs'

const schema = Yup.object().shape({
  locationCode: Yup.string()
    .min(8)
    .max(8)
    .required('You must search for a location code.'),
})

export const LocationCodeInput = ({ setLocationCode }) => {
  const { search } = useLocation()
  const { code: initialCode } = useMemo(
    () =>
      qs.parse(search, {
        ignoreQueryPrefix: true,
      }),
    [search]
  )

  return (
    <div className="w-full flex items-center justify-center">
      {
        <Formik
          initialValues={{
            locationCode: initialCode,
          }}
          validationSchema={schema}
          onSubmit={({ locationCode }) => {
            setLocationCode(locationCode)
          }}
        >
          {() => (
            <Form className="w-full container">
              <div className="flex flex-col space-y-1">
                <Input label="Location Code" name="locationCode" type="text" />
                <div className="w-full flex justify-between">
                  <div className="text-xs text-table-t-weak">
                    Type in the user code to lookup user location and profile.
                  </div>
                  <SubmitButton label="Search" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      }
    </div>
  )
}
