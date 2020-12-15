import { createError } from '../helpers/error'
import { handleResponseData } from '../helpers/data'
import { parseResponseHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'

function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 从配置中读入参数
    const { url, cancelToken, data = null, method = 'get', headers = {}, responseType, timeout = 10000 } = config

    // 声明xhr对象
    const request = new XMLHttpRequest()

    // 设置响应类型
    if (responseType) {
      request.responseType = responseType
    }

    // 设置超时时间
    if (timeout) {
      request.timeout = timeout
    }

    // 初始化xhr请求 - 异步
    request.open(method.toUpperCase(), url!, true)

    // 设置xhr headers
    setXhrHeaders(headers, request)

    // 监听xhr状态改变响应
    request.onreadystatechange = function () {
      if (request.readyState !== XMLHttpRequest.DONE) {
        return
      }

      // 网络错误/超时响应， status为0
      if (request.status === 0) {
        return
      }

      // 构造响应AxiosResponse
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: handleResponseData(responseData), // 响应data
        status: request.status,
        statusText: request.statusText,
        headers: parseResponseHeaders(request.getAllResponseHeaders()), // 响应头
        config,
        request
      }

      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          response.status,
          request,
          response
        ))
      }
    }

    // 监听xhr请求网络错误
    request.onerror = function () {
      reject(createError(
        `NetWork Eroor`,
        config,
        null,
        request
      ))
    }

    // 监听xhr请求网络超时
    request.ontimeout = function () {
      reject(createError(
        `Timeout of ${ timeout } ms exceeded`,
        config,
        `ECONNABORTED`,
        request
      ))
    }

    // cancelToken存在在配置中，将ajax取消方法挂在到cancelToken上
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    // 发送xhr请求
    request.send(data)
  })
}

function setXhrHeaders (headers: any, request: XMLHttpRequest): void {
  Object.keys(headers).forEach((name) => {
    request.setRequestHeader(name, headers[name])
  })
}

export default xhr