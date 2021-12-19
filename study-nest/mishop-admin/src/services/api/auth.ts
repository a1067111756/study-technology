/* 认证相关 */
import request from '@/utils/request'

// 登录
export async function login(loginReq: API.ILoginReq) {
  return request('/api/auth/login', {
    method: 'POST',
    data: loginReq
  })
}

// 注册
export async function register(registerReq: API.IRegisterReq) {
  return request('/api/auth/register', {
    method: 'Post',
    data: registerReq
  })
}

// 验证码
export async function getFakeCaptcha() {
  return request<API.IFakeCaptchaRes>('/api/auth/captcha', {
    method: 'GET'
  })
}
