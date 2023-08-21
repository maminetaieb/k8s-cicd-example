import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CheckAuth } from './routes/CheckAuth'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuth />
    </QueryClientProvider>
  )
}

export default App
