import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

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
      meta: { layout: 'Empty'},
      component: () => import('@/views/Login')
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'Empty'},
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

router.beforeEach((to, from ,next) => {
  const currentUser = firebase.auth().currentUser;
  if (to.meta.auth && !currentUser) {
    next('/login?message=login')
  } else {
    next();
  }
})

export default router
