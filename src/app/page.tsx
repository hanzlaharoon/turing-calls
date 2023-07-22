'use client'

import { useAuthContext } from '@/hooks'
import { LoginPayload, useLoginMutation } from '@/queries'

export default function Login() {
  const { mutate } = useLoginMutation()
  const {
    actions: { login },
  } = useAuthContext()

  function onSubmit(params: LoginPayload) {
    mutate(params, {
      onSuccess: (data) => {
        login(data)
      },
    })
  }

  return (
    <>
      <article className="prose">
        <h1>Login Page</h1>
      </article>
    </>
  )
}
