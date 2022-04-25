/* 认证相关 */
import request from '@/utils/request'

// 登录
export async function login(loginReq: APIS.ILoginReq) {
  return request<APIS.ILoginRes>('/api/auth/login', {
    method: 'POST',
    data: loginReq
  })
}

// 登出
export async function logOut() {
  return Promise.resolve()
}

// 注册
export async function register(registerReq: APIS.IRegisterReq) {
  return request('/api/auth/register', {
    method: 'Post',
    data: registerReq
  })
}

// 验证码
export async function getFakeCaptcha() {
  return request<APIS.IFakeCaptchaRes>('/api/auth/captcha', {
    method: 'GET'
  })
}
