import Vue from 'vue'
import App from './App.vue'
import ThreeMap from '@/components/three-map/index.vue'

Vue.component('global-three-map', ThreeMap)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
