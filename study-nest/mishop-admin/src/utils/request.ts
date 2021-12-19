import { notification } from 'antd'
import { extend } from 'umi-request'
import type { RequestOptionsInit } from 'umi-request'

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   405: '请求方法不被允许。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };
//
// // 错误请求处理
// const errorHandler = (error) => {
// };

const IINTERFACE_CORRECT_CODE = '00000'
const IINTERFACE_ERROR_MESSAGE = {
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
  return {
    url,
    options
  }
})

// 响应拦截器
requestInstance.interceptors.response.use(async (response) => {
  const resJson = await response.clone().json()

  // api接口报错统一处理
  const { code, message } = resJson
  if (code !== IINTERFACE_CORRECT_CODE) {
    notification.error({
      message: IINTERFACE_ERROR_MESSAGE[resJson.code] || message,
      description: `code - ${resJson.code}, url - ${response.url}`
    })
    return Promise.reject(resJson.data)
  }

  return resJson.data
})

export default requestInstance
