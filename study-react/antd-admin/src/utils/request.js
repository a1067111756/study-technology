import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '',
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    // 错误码判断 - 正确
    if (response.data.code !== '00000') {
      return Promise.reject(response.data.message || 'Error')
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
