import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

import LogoFull from '../assets/images/navbars/logo-full.svg'
import Background from '../assets/images/login/background.svg'

export const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-login-background-start via-login-background-via to-login-background-end">
      <div className="flex flex-col items-center justify-center container  space-y-4 text-page-background h-80">
        <img src={LogoFull} alt="" className="w-80" />
        <AiOutlineLoading className="w-10 animate-spin" />
      </div>
      <div className="mt-auto bottom-0 w-full z-0 inset-x-0 opacity-60 md:flex hidden">
        <img className="flex-1" src={Background} alt="" />
      </div>
    </div>
  )
}
