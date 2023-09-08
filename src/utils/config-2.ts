import { AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const baseUrl = 'https://2e80-102-89-42-144.ngrok.io'

const createApiClient = (auth = true, formData = true) => {
  const config: AxiosRequestConfig = {
    baseURL: baseUrl,
  }

  if (auth) {
    const token =  'c87af9b0-0d74-4ae0-939a-1f78cd96249d';

    if(formData) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/form-data',
        Accept: 'application/json'
      }
      console.log(config.headers)
    } else if (token) {
      console.log("it got here but should not")
      config.headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    // if (token) {

    //   config.auth = token

    // }
  }

  const client = axios.create(config)

  client.interceptors.response.use(
    (res) => {
      return Promise.resolve(res)
    },

    (err) => {
      if (err.response) {
        if (
          err.response.data &&
          err.response.data.message === 'Token Expired'
        ) {
          // AuthActions.logout();

          window.location.href = '/login'
        }
      }

      return Promise.reject(err)
    },
  )

  return client
}

export default createApiClient
