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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "page-auth" */ '@/views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "page-auth" */ '@/views/auth/Register.vue')
  },
  {
    path: '/column-detail',
    name: 'ColumnDetail',
    component: () => import(/* webpackChunkName: "page-column-detail" */ '@/views/column-detail/index.vue')
  }
]

// 路由配置
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
