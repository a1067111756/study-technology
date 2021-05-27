/* 用户认证相关 */
import request from '@/utils/request'
import { ILoginDTO, ILoginResDTO, IGetUserInfoResDTO } from '@/types/dto'

// 登录
export const login = (params: ILoginDTO) => request.post<ILoginResDTO>('/user/login', params)

// 获取用户信息
export const getUserInfo = () => request.get<IGetUserInfoResDTO>('/user/current')