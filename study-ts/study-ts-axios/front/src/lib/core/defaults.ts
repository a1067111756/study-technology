import { AxiosRequestConfig } from "../types"
import { handleHeaders } from '../helpers/headers'
import { handleRequestData, handleResponseData } from '../helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function (data: any, headers: any): any {
      handleHeaders(headers)
      return handleRequestData(data)
    }
  ],
  transformResponse: [
    function (data: any): any {
      return handleResponseData(data)
    }
  ]
}

// 对不同请求方法设置header
const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/json'
  }
})

export default defaults
