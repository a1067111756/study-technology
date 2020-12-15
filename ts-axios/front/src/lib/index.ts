import Axios from './core/axios'
import defaults from './core/defaults'
import { extend } from './helpers/util'
import { AxiosStatic, AxiosRequestConfig } from './types'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'


function createInstance(config: AxiosRequestConfig) :AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance as AxiosStatic
}

// 导出接口类型
export * from './types/index'
// 导出实例
const axios = createInstance(defaults)

// 扩展axios属性
axios.create = function create (config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel


export default axios