import axios, { type AxiosInstance } from 'axios'
import settings from '../config/config.json'

const axiosInstance = (): AxiosInstance => {
  return axios.create(
    {
      baseURL: settings.apiURL,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  )
}
export default axiosInstance
