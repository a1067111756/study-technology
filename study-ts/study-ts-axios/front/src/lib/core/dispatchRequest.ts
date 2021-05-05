import xhr from './xhr'
import { bulidURL } from '../helpers/url'
import { handleRequestData } from '../helpers/data'
import { handleHeaders, flattenHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import transform from './transform'

// 方法 - 请求入口
function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

// 方法 - 配置处理入口
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 方法 - url处理入口
function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url!, params)
}

function transformResponseData (res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers)
  return res
}

function throwIfCancellationRequested (config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default dispatchRequest
