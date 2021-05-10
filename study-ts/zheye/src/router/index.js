import { createRouter, createWebHashHistory } from 'vue-router'

// 路由编排
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "page-home" */ '@/views/home/index.vue')
  }
]

// 路由配置
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
