import axios from 'axios'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 携带token
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service