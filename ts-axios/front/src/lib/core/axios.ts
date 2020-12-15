import InterceptorManager from './interceptorManager'
import dispatchRequest from './dispatchRequest'
import { AxiosPromise, AxiosRequestConfig, Method, AxiosResponse, ResolvedFn, RejectedFn } from '../types/index'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved?: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise),
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors
  defaults: AxiosRequestConfig

  constructor (initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(config: AxiosRequestConfig): any {

    // 合并配置
    config = mergeConfig(this.defaults, config)

    // 拦截器的链式调用
    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    // 遍历拦截器
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(this.__requestMethodWithOutData(url, 'get', config))
  }

  delete (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(this.__requestMethodWithOutData(url, 'delete', config))
  }
  
  head (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(this.__requestMethodWithOutData(url, 'head', config))
  } 
  
  options (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(this.__requestMethodWithOutData(url, 'options', config))
  }
  
  post (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(this.__requestMethodWithData(url, 'post', data, config))
  }

  put (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(this.__requestMethodWithData(url, 'post', data, config))
  }
  
  patch (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(this.__requestMethodWithData(url, 'post', data, config))
  }  

  __requestMethodWithOutData (url: string, method: Method, config?: AxiosRequestConfig) {
    return Object.assign(config || {}, {
      url,
      method: method
    })
  }

  __requestMethodWithData (url: string, method: Method, data?: any, config?: AxiosRequestConfig) {
    return Object.assign(config || {}, {
      url,
      data,
      method: method
    })
  }  
}