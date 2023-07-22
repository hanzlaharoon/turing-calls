'use client'

import { AuthProvider, useAuth } from '@/hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  const router = useRouter()
  const authState = useAuth()
  const {
    state: { status },
  } = authState

  useEffect(() => {
    if (status === 'loggedIn') router.replace('/calls')
    else router.push('/')
  }, [status])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider value={authState}>{children}</AuthProvider>
      </QueryClientProvider>
    </>
  )
}
