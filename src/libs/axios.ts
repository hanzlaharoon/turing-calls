import { LoginResponse } from '@/queries'
import axios from 'axios'
import dayjs from 'dayjs'

const bufferMinutesStart = 6
const bufferMinutesEnd = 8

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
})

async function refreshAuthToken(): Promise<
  Omit<LoginResponse, 'refreshToken'>
> {
  const accessToken = localStorage.getItem('accessToken')
  const result = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API}auth/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res?.data)

  return result
}

axiosClient.interceptors.request.use(async (req) => {
  if (req.url !== '/auth/login') {
    const accessToken = localStorage.getItem('accessToken')
    const tokenCreated = localStorage.getItem('tokenCreatedAt')

    if (accessToken && tokenCreated) {
      const tokenCreatedAt = parseInt(tokenCreated)
      const currentTime = dayjs()

      const beforeTokenBuffer = dayjs(tokenCreatedAt).add(
        bufferMinutesStart,
        'minute'
      )

      const afterTokenBuffer = dayjs(tokenCreatedAt).add(
        bufferMinutesEnd,
        'minute'
      )

      const isExpired = currentTime.isAfter(afterTokenBuffer)

      const isTokenNearExpired =
        currentTime.isAfter(beforeTokenBuffer) &&
        currentTime.isBefore(afterTokenBuffer)

      if (isTokenNearExpired) {
        const result = await refreshAuthToken()
        req.headers.Authorization = `Bearer ${result?.accessToken}`
      }

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${accessToken}`
      }
    }
  }

  return req
})
