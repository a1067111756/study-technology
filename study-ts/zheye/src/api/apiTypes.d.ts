export interface ILoginForm {
  email: string
  password: string
}

export interface ILoginResponseData {
  token: string
}

export interface IGetUserInfoRes {
  _id: string,
  email: string,
  nickName: string,
  column: string
}


