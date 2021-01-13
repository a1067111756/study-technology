import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: resolve => require(['@/views/home/index'], resolve)
  }
]

const router = new VueRouter({
  routes
})

export default router
