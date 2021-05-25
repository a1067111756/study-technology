/* 用户认证相关 */
import request from '@/utils/request.ts'

// 登录
export const login = (params: object) => request.post('/user/login', params)

// 注册
export const register = () => request.get('/api/users')
