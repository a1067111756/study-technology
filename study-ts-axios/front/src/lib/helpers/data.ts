/* 处理data */

import { isPlainObject } from './util'

export function handleRequestData (data: any): any {
  return isPlainObject(data)
    ? JSON.stringify(data)
    : data
}

export function handleResponseData (data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }

    return data
  }
}