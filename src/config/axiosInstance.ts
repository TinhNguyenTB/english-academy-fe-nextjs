import { PATHS } from '@/constants/paths'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (typeof window !== 'undefined') {
      switch (error.response?.status) {
        case 403:
          window.location.href = PATHS.FORBIDDEN
          break
        case 401:
          window.location.href = PATHS.LOGIN
          break
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
