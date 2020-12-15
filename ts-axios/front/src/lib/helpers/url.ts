/* 处理params */

import { isDate, isPlainObject, encode } from './util'

export function bulidURL (url: string, params: any): string {
  // 没有参数直接返回url
  if (!params) return url

  // 遍历获取参数
  let finalUrl: string = ''
  Object.keys(params).forEach(key => {
    let value = params[key]
    console.log(value)

    // 1. 如果参数值为空，直接忽略不传递
    if (value === null || typeof value === 'undefined') {
      return
    }

    // 2. 参数值为Date - 最终请求的 url 是 /base/get?date=2019-04-01T05:55:39.030Z，date 后面拼接的是 date.toISOString() 的结果
    if (isDate(value)) {
      finalUrl += `${encode(key)}=${encode(value.toISOString())}`
      return
    }

    // 3. 参数值为数组 - 最终请求的 url 是 /base/get?foo[]=bar&foo[]=baz'
    if (Array.isArray(value)) {
      finalUrl += value.map(val => `${encode(key)}[]=${encode(val)}`).join('&')
      return
    }

    // 4. 参数值为对象 - 最终请求的 url 是 /base/get?foo=%7B%22bar%22:%22baz%22%7D，foo 后面拼接的是 {"bar":"baz"} encode 后的结果。
    if (isPlainObject(value)) {
      finalUrl += `${encode(key)}=${encode(JSON.stringify(value))}`
      return
    }    

    finalUrl += `${encode(key)}=${encode(value)}`
  })

  // 丢弃 url 中的哈希标记
  const markIndex = url.indexOf('#')
  if (markIndex !== -1) {
    url = url.slice(0, markIndex)
  }

  // 保留 url 中已存在的参数
  if (finalUrl) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + finalUrl
  }  

  console.log(url)
  return url
}