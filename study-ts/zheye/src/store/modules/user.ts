import { login, getUserInfo } from '@/api/modules/auth.ts'
import { ILoginForm, ILoginResponseData, IGetUserInfoRes } from '@/api/apiTypes'
import { getToken, setToken, removeToken } from '@/utils/auth'

interface IStateModel {
  token: string | undefined,
  userInfo: {
    id: string | undefined,
    name: string | undefined,
    avatar: string | undefined,
    column: string | undefined
  }
}

const state: IStateModel = {
  token: getToken(),
  userInfo: {
    id: undefined,
    name: undefined,
    column: undefined,
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
  }
}

const mutations = {
  // 设置token
  SET_TOKEN: (state: IStateModel, token: string) => {
    state.token = token
    setToken(token)
  },
  // 设置用户信息
  SET_USERINFO: (state: IStateModel, userInfo: IGetUserInfoRes) => {
    state.userInfo.id = userInfo._id
    state.userInfo.name = userInfo.nickName
    state.userInfo.column = userInfo.column
  },  
  // 移除token
  REMOVE_TOKEN: () => {
    state.token = undefined
    removeToken()
  }  
}

const actions = {
  authLogin (context: any, loginForm: ILoginForm) {
    return login(loginForm)
      .then((data: any) => { // 将token存储cookie
        context.commit('SET_TOKEN', data.token)
        return getUserInfo()
      })
      .then((data: any) => { // 获取用户信息
        context.commit('SET_USERINFO', data)
        return data
      })
  }
}

export default {
  state,
  mutations,
  actions
}
