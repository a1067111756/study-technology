import Vue from 'vue'
import Vuex from 'vuex'
import tag from './modules/tag.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
		tag
  }
})

export default store