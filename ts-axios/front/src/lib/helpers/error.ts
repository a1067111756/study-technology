import { AxiosRequestConfig, AxiosResponse } from '../types/index'


export class AxiosError extends Error {
    code ?: string | number | null
    config: AxiosRequestConfig
    request ?: any
    response?: AxiosResponse
    isAxiosError: boolean
    
    constructor (
      message: string,
      config: AxiosRequestConfig,
      code?: string | number | null,
      request?: any,
      response?: AxiosResponse,
    ) {
      super(message)
      this.code = code
      this.config = config
      this.request = request
      this.response = response
      this.isAxiosError = true

      Object.setPrototypeOf(this, AxiosError.prototype)
    }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | number | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}