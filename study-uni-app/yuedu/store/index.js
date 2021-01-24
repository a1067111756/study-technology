import Vue from 'vue'
import Vuex from 'vuex'
import tag from './modules/tag'
import user from './modules/user'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
		tag,
    user
  }
})

export default store