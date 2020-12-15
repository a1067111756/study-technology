import { Method } from '../types'
import { deepMerge } from './util'

const ENUM_HEADERS_NAME = [
  { label: '请求参数类型', value: 'Content-Type', upperCase: 'CONTENT-TYPE' }
]

export function handleHeaders (headers: any): any {
  fixedHeadersName(headers)

  if (headers && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }

  return headers
}

// 方法 - 转化不规则的请求头key值， 例如 输入值'content-type' ---> 输出值 'Content-Type'
function fixedHeadersName (headers: any): void {
  if (!headers) return
  const upperCaseHeadersName = ENUM_HEADERS_NAME.map(ENUM => ENUM.upperCase)
  Object.keys(headers).forEach(name => {
    if (upperCaseHeadersName.includes(name.toUpperCase())) {
      const match: any = ENUM_HEADERS_NAME.find(item => item.upperCase === name)?.value
      headers[match] = headers[name]
      delete headers[name]
    }
  })
}

// 方法 - 格式化响应headers为json格式
export function parseResponseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

// 合并请求头策略
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}