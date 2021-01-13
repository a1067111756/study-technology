import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/views/Home.vue' /* webpackChunkName: "page-home" */)
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router