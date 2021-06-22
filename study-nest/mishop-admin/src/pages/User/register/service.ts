import request from 'umi-request';
import type { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/mock-api/auth/register', {
    method: 'POST',
    data: params,
  });
}
