import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getter'

const store = createStore({
  getters,
  modules: {
    user
  }
})

export default store
