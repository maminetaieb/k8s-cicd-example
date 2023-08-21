import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useAuthStore } from '../stores'
import * as Yup from 'yup'

import { AiOutlineLoading, AiFillExclamationCircle } from 'react-icons/ai'

import DesktopLogo from '../assets/images/login/desktop-logo.svg'
import MobileLogo from '../assets/images/login/mobile-logo.svg'
import Background from '../assets/images/login/background.svg'

export const Login = () => {
  const { login, loading, loginMessage } = useAuthStore()
  const [error, setError] = useState(null)

  const fieldClass =
    'w-full text-white text-opacity-100 placeholder-opacity-40 outline-none h-10 p-2 bg-login-field focus:bg-login-field-active text-base placeholder-white'

  const fieldWithErrorClass = `${fieldClass} border-b border-login-error`

  const buttonClass =
    'mt-auto px-20 py-2 focus:outline-none rounded-3xl bg-white bg-opacity-90 text-login-button hover:bg-opacity-80 transition-colors duration-200 '

  const disabledButtonClass = `${buttonClass} text-opacity-20 cursor-not-allowed bg-opacity-20 text-login-button hover:bg-opacity-20`

  const errorClass =
    'w-full h-5 text-sm font-extralight text-login-error flex space-x-1 items-center'

  const loginSchema = Yup.object().shape({
    username: Yup.string().min(10).trim().required(),
    password: Yup.string().min(10).required(),
  })

  return (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-b from-login-background-start via-login-background-via to-login-background-end">
      <div className="w-full h-full flex flex-col md:w-2/3 md:rounded-md max-w-3xl md:h-login-container bg-login-container md:p-10 p-4 z-30 space-y-1">
        {loginMessage && (
          <div className="w-full flex justify-center items-center rounded-md border bg-success bg-opacity-10 border-success py-2 text-success">
            <div className="text-base"> {loginMessage}</div>
          </div>
        )}
        <div className="w-full h-full flex items-center justify-around space-x-3">
          <div className="hidden md:block w-full">
            <div className="flex items-center justify-center flex-1 p-2">
              <img src={DesktopLogo} alt="" className="w-full" />
            </div>
          </div>

          <div className="hidden md:block border-white border-opacity-30 border-r h-full bg-white bg-opacity-30" />

          <div className="w-full h-full flex flex-col items-center justify-start md:jusitfy-between space-y-5 px-4 py-6">
            <div className="md:hidden flex items-center justify-center">
              <img src={MobileLogo} alt="" className="w-full" />
            </div>
            {error && (
              <div className="w-full flex justify-center items-center rounded-md border border-login-error py-2 font-extralight text-login-error space-x-1">
                <AiFillExclamationCircle />
                <div className="font-semibold">Error: </div>
                <div className="font-light">
                  {error ? error : 'Something went wrong'}
                </div>
              </div>
            )}
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={async (values) => {
                const { username, password } = values
                const error = await login({ username, password })
                if (error) setError(error)
              }}
            >
              {({ errors, touched }) => (
                <Form className="w-full flex flex-col items-center justify-between space-y-3">
                  <div className="w-full space-y-1">
                    <div className=" text-white text-sm">Username</div>
                    <Field
                      className={
                        errors.username && touched.username
                          ? fieldWithErrorClass
                          : fieldClass
                      }
                      id="username"
                      name="username"
                      placeholder="Your username"
                      type="username"
                    />
                    <div className={errorClass}>
                      {errors.username && touched.username && (
                        <>
                          <div>
                            <AiFillExclamationCircle />
                          </div>
                          <div>{errors.username}</div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-full space-y-1">
                    <div className=" text-white text-sm">Password</div>
                    <Field
                      className={
                        errors.password && touched.password
                          ? fieldWithErrorClass
                          : fieldClass
                      }
                      id="password"
                      name="password"
                      placeholder="Your password"
                      type="password"
                    />
                    <div className={errorClass}>
                      {errors.password && touched.password && (
                        <>
                          <div>
                            <AiFillExclamationCircle />
                          </div>
                          <div>{errors.password}</div>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    className={
                      (errors.password && touched.password) ||
                      (errors.username && touched.username) ||
                      loading
                        ? disabledButtonClass
                        : buttonClass
                    }
                    disabled={
                      (errors.password && touched.password) ||
                      (errors.username && touched.username) ||
                      loading
                    }
                    type="submit"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>
            <div className="">
              {loading && (
                <AiOutlineLoading className="animate-spin text-white"></AiOutlineLoading>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full z-0 inset-x-0 opacity-60 md:flex hidden">
        <img className="flex-1" src={Background} alt="" />
      </div>
    </div>
  )
}
