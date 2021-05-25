import { login } from '@/api/modules/auth.ts'

const state = () => {
  return {
    userInfo: {
      id: 1515815,
      name: '澄鱼',
      avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
      isLogin: false
    }
  }
}

const mutations = {
  // 账号登陆
  AUTH_LOGIN (state, loginInfo) {
    login(loginInfo).then(data => {
      // 将token存储
      console.log(data)
    })
  }
}

const actions = {
  authLogin ({ commit }, loginInfo) {
    commit('AUTH_LOGIN', loginInfo)
  }
}

export default {
  state,
  mutations,
  actions
}
