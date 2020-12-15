import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueBus from 'vue-ts-bus'

Vue.use(ElementUI)
Vue.use(VueBus)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
