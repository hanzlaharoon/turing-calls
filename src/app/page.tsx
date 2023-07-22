'use client'

import { RequiredLabel } from '@/components'
import { useAuthContext } from '@/hooks'
import { useLoginMutation } from '@/queries'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required()
type FormData = yup.InferType<typeof schema>

export default function Login() {
  const { mutate, isLoading } = useLoginMutation()
  const {
    actions: { login },
  } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  function onSubmit(params: FormData) {
    mutate(params, {
      onSuccess: (data) => {
        login(data)
      },
    })
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-50">
        <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div className="form-control w-full max-w-xs">
                  <RequiredLabel text="User Name" htmlFor="username" />
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full max-w-xs rounded-sm"
                    {...register('username')}
                  />
                  <p className="text-xs text-error">
                    {errors?.username?.message}
                  </p>
                </div>
                <div className="form-control w-full max-w-xs">
                  <RequiredLabel text="Password" htmlFor="password" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs rounded-sm"
                    {...register('password')}
                  />
                  <p className="text-xs text-error">
                    {errors?.password?.message}
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`btn btn-primary rounded-sm bg-blue-500 text-white`}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}
