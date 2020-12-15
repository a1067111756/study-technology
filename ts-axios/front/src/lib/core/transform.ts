import { AxiosTransformer } from '../types';
/* 请求 / 响应数据/header处理 */

export default function transform (data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]) {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}