/* axios参数配置 */

import { Resolve } from 'element-ui/types/cascader-panel';

// 请求方法接口
export type Method = 'get' | 'GET' 
  | 'put' | 'PUT' 
  | 'delete' | 'DELETE' 
  | 'head' | 'HEAD' 
  | 'post' | 'POST' 
  | 'options' | 'OPTIONS'
  | 'patch' | 'PATCH'

// 请求配置接口
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken

  [propName: string]: any
}

// 请求取消接口实例
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

// 请求取消方法接口定义
export interface Canceler {
  (message?: string): void
}

// CancelToken类构造函数参数接口定义
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string):Cancel
}

// 请求响应接口
export interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig,
  request: any
}

// 请求错误接口
export interface AxiosError {
  code: string  | null,
  msssage: string,
  config: AxiosRequestConfig,
  response: AxiosResponse,
  request: any,
  isAxiosError: boolean
}

export interface AxiosPromise extends Promise<AxiosResponse> {
}

export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>,
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request (config: AxiosRequestConfig): AxiosPromise

  get (url: string, config?: AxiosRequestConfig): AxiosPromise

  delete (url: string, config?: AxiosRequestConfig): AxiosPromise

  head (url: string, config?: AxiosRequestConfig): AxiosPromise

  options (url: string, config?: AxiosRequestConfig): AxiosPromise

  post (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface AxiosInterceptorManager<T> {
  user (resolved: ResolvedFn<T>, reject?: RejectedFn): number

  eject (id: number): void
}

export interface ResolvedFn<T=any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}