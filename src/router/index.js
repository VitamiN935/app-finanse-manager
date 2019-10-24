import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'Main', auth: true },
      component: () => import('@/views/Home')
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'Empty', auth: false },
      component: () => import('@/views/Login')
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'Empty', auth: false },
      component: () => import('@/views/Register')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'Main', auth: true },
      component: () => import('@/views/Categories')
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'Main', auth: true },
      component: () => import('@/views/Record')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'Main', auth: true },
      component: () => import('@/views/Planning')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'Main', auth: true },
      component: () => import('@/views/History')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: { layout: 'Main', auth: true },
      component: () => import('@/views/Detail')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'Main', auth: true },
      component: () => import('@/views/Profile')
    },
  ]
})


export default router
