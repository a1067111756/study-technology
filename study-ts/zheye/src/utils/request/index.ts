import { getToken } from '@/utils/auth'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// request拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
    // 携带token
    if (getToken()) { 
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use((response) => {
    // 错误码判断 - 正确
    if (response.data.code !== 0) {
      return Promise.reject(new Error(response.data.message || 'Error'))
    // 抛出错误 - 失败
    } else {
      return response.data.data
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service