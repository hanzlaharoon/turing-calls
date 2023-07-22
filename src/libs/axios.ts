import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
})

axiosClient.interceptors.request.use((req) => {
  if (req.url !== '/auth/login') {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) req.headers.Authorization = `Bearer ${accessToken}`
  }

  return req
})
