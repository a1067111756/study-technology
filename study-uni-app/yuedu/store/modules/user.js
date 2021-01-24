const user = {
  state: () => ({
		userInfo: {
      id: "8010388",
      _id: "5ff9ae0a5c2b5100019283a9",
      gender: "男",
      fans_count: 0,
      follow_count: 0,
      status: "normal",
      professional: "架构师",
      author_name: "Java架构师讲师团",
      explain: "架构师成长沟通群878622640，欢迎加入~",
      avatar: "//img2.sycdn.imooc.com/5dafce1a00013fd501400140-160-160.jpg"
    }
	}),
	
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    CLEAR_USER_INFO: (state) => {
      state.userInfo = null
    },    
	},
	
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
    },
    clearUserInfo ({ commit }) {
      commit('CLEAR_USER_INFO')
    }
	},
	
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    }
  }
}

export default user