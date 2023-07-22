'use client'

import { AuthProvider, useAuth } from '@/hooks'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

export default function Providers({ children }: PropsWithChildren) {
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
      <AuthProvider value={authState}>{children}</AuthProvider>
    </>
  )
}
