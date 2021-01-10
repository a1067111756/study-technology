import Vue from 'vue'
import App from './App'

// 全局属性注册
import '@/api/index'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
   ...App
})
app.$mount()
