import { notification } from 'antd'
import { extend } from 'umi-request'
import localTango from 'local-tango'
import type { RequestOptionsInit } from 'umi-request'

// 请求状态码表
const STATUS_ERROR_MESSAGE = {
  400: '错误请求',
  401: '用户没有权限',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '服务器未响应',
  405: '请求方法不被允许',
  406: '请求的格式不可得',
  410: '请求的资源不可用',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时无法响应请求',
  504: '网关超时'
};

// 接口响应码表
const INTERFACE_CORRECT_CODE = '00000'
const INTERFACE_ERROR_MESSAGE = {
  '00002': '验证码错误',
  '00020': '该用户已注册',
  '00021': '用户名应为4~16位字符',
  '00022': '密码应为4~16位字符'
}

// request实例
const requestInstance = extend({
  timeout: 10 * 1000
});

// 请求拦截器
requestInstance.interceptors.request.use( (url: string, options: RequestOptionsInit) => {
  // 附带token
  const token = localTango.getItemString('token', '')
  if (token && token !== '') {
    options.headers = {
      ...options.headers,
      authorization: 'Bearer ' + token,
    }
  }

  return {
    url,
    options
  }
})

// 响应拦截器
requestInstance.interceptors.response.use(async (response) => {
  // 响应状态报错统一处理
  const { status, statusText, url } = response
  if (status > 300) {
    const errorMsg = STATUS_ERROR_MESSAGE[status] || statusText
    notification.error({
      message: errorMsg,
      description: `code - ${status}, url - ${url}`
    })
    return Promise.reject(errorMsg)
  }

  // api接口报错统一处理
  const resJson = await response.clone().json()
  const { code, message } = resJson
  if (code !== INTERFACE_CORRECT_CODE) {
    const errorMsg = INTERFACE_ERROR_MESSAGE[resJson.code] || message
    notification.error({
      message: errorMsg,
      description: `code - ${code}, url - ${url}`
    })
    return Promise.reject(errorMsg)
  }

  return resJson.data
})

export default requestInstance
