import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import store from './store/index.js'

// 全局属性注册
import '@/api/index'

// 全局插件注册
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
