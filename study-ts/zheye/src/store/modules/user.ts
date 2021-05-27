import { login, getUserInfo } from '@/api/modules/auth.ts'
import { ILoginDTO, ILoginResDTO, IGetUserInfoResDTO } from '@/types/dto'
import { getCookie, setCookie, removeCookie, getCookieJSON } from '@/utils/cookieUtils'

interface IStateModel {
  token: string | undefined,
  userInfo: {
    id: string | undefined,
    name: string | undefined,
    avatar: string | undefined,
    column: string | undefined
  }
}

const COOKIE_KEY_TOKEN: string = 'zheye-token'
const COOKIE_KEY_USERINFO: string = 'zheye-userinfo'

const state: IStateModel = {
  token: getCookie(COOKIE_KEY_TOKEN),
  userInfo: getCookieJSON(COOKIE_KEY_USERINFO) || {}
}

const mutations = {
  // 设置token
  SET_TOKEN: (state: IStateModel, token: string) => {
    state.token = token
    setCookie(COOKIE_KEY_TOKEN, token)
  },
  // 设置用户信息
  SET_USERINFO: (state: IStateModel, userInfo: IGetUserInfoResDTO) => {
    state.userInfo.id = userInfo._id
    state.userInfo.name = userInfo.nickName
    state.userInfo.column = userInfo.column
    setCookie(COOKIE_KEY_USERINFO, JSON.stringify(state.userInfo))
  },  
  // 移除token
  REMOVE_TOKEN: () => {
    state.token = undefined
    removeCookie(COOKIE_KEY_TOKEN)
  },  
  // 移除userInfo
  REMOVE_USERINFO: () => {
    state.userInfo = {} as any
    removeCookie(COOKIE_KEY_USERINFO)
  }    
}

const actions = {
  authLogin (context: any, loginForm: ILoginDTO) {
    return login(loginForm)
      .then((data: ILoginResDTO) => { // 将token存储cookie
        context.commit('SET_TOKEN', data.token)
        return getUserInfo()
      })
      .then((data: IGetUserInfoResDTO) => { // 获取用户信息
        context.commit('SET_USERINFO', data)
        return data
      })
  },
  authLoginOut (context: any) {
    context.commit('REMOVE_TOKEN')
    context.commit('REMOVE_USERINFO')
  }  
}

export default {
  state,
  mutations,
  actions
}
