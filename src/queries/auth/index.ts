import { axiosClient } from '@/libs'
import { User } from '@/types'
import { useMutation } from '@tanstack/react-query'

export interface LoginPayload extends Pick<User, 'username'> {
  password: string
}

export interface RawLoginResponse {
  user: User
  access_token: string
  refresh_token: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

async function login(params: LoginPayload): Promise<LoginResponse> {
  return await axiosClient
    .post('/auth/login', params)
    .then((res) => res?.data as RawLoginResponse)
    .then((data) => ({
      user: data?.user,
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
    }))
}

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  })
