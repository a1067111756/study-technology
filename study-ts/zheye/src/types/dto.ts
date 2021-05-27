import { IColumnEntity } from './model'

// 登陆接口参数
export interface ILoginDTO {
  email: string
  password: string
}

// 登陆接口返回数据
export interface ILoginResDTO {
  token: string
}

// 获取用户信息接口返回数据
export interface IGetUserInfoResDTO {
  _id: string,
  email: string,
  nickName: string,
  column: string
}

// 获取专栏分页接口返回数据
export interface IGetPageOfColumnResDTO {
  count?: number,
  pageSize?: number,
  currentPage?: number,
  list: Array<IColumnEntity>
}



