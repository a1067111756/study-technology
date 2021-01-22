const tag = {
  state: () => ({
		history: []
	}),
	
  mutations: {
    ADD_NEW_TAG: (state, tag) => {
			if (state.history.includes(tag)) {
				const index = state.history.indexOf(tag)
				state.history.splice(index, 1)
				state.history.unshift(tag)
				return 
			}
      state.history.push(tag)
    },
		CLEAR: (state) => {
			state.history = []
		}		
	},
	
  actions: {
    addNewTag ({ commit }, tag) {
			console.log(tag)
      commit('ADD_NEW_TAG', tag.trim())
    },
    clearHistory ({ commit }) {
      commit('CLEAR')
    }
	},
	
  getters: {
    getHistory: (state) => {
      return state.history
    }
  }
}

export default tag