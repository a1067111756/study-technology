import Vue from 'vue'
import App from './App'
import store from './store/index.js'

// 全局属性注册
import '@/api/index'

Vue.config.productionTip = false
App.mpType = 'app'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})