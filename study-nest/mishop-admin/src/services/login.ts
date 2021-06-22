import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export type RegisterParamsType = {
  username: string;
  password: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/mock-api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountRegister(params: RegisterParamsType) {
  return request('/mock-api/auth/register', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha() {
  return request(`/mock-api/auth/captcha`);
}
