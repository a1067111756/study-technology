/* 用户认证相关 */
import request from '@/utils/request'
import { ILoginForm, ILoginResponseData, IGetUserInfoRes } from '../apiTypes'

// 登录
export const login = (params: ILoginForm) => request.post<ILoginResponseData>('/user/login', params)

// 获取用户信息
export const getUserInfo = () => request.get<IGetUserInfoRes>('/user/current')

// 注册
export const register = () => request.get('/api/users')