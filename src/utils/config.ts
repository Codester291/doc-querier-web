import axios from 'axios'

export const baseUrl = 'http://localhost:5300'

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('Login')
    config.headers.Authorization = `Bearer ${token}`
    
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
