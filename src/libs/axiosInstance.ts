import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig, type AxiosRequestHeaders } from 'axios'
import settings from '../config/config.json'

const axiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: settings.apiURL,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

  const addAuthorizationHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${JSON.parse(token).token}`
      } as unknown as AxiosRequestHeaders
    }
    return config
  }

  // Intercepting all requests and adding the authorization header
  instance.interceptors.request.use(
    (config) => addAuthorizationHeader(config),
    async (error) => await Promise.reject(error)
  )

  // Intercepting all responses and handling invalid token case
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        // Invalid token, redirect user to login page using window.location
        window.location.href = '/login'
      }
      return await Promise.reject(error)
    }
  )

  return instance
}

export default axiosInstance
