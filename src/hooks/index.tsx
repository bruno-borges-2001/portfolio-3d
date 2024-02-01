'use client'

import NextQueryParamsAdaptor from 'next-query-params/app'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { QueryParamProvider } from 'use-query-params'
import { StateContextProvider } from './useStateContext'

import 'react-toastify/dist/ReactToastify.css'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryParamProvider adapter={NextQueryParamsAdaptor}>
      <StateContextProvider>
        <ToastContainer theme='dark' />
        {children}
      </StateContextProvider>
    </QueryParamProvider>
  )
}

export default Providers
