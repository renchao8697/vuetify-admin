// import Vue from 'vue'
// import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes: Array<RouteConfig> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import FullScreen from '@/layout/fullScreen/index.vue'
import AdminLayout from '@/layout/admin/index.vue'
// import Index from '@views/Index.vue'
// import Dashboard from '@/views/Dashboard.vue'

// import MultipleIndex from '@/views/multiple/index.vue'

Vue.use(VueRouter)

export const layoutRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      icon: 'mdi-palette',
      text: 'Dashboard'
    }
  },
  {
    name: 'Charts',
    path: '/charts',
    meta: {
      icon: 'mdi-chart-timeline-variant',
      text: 'Charts'
    },
    component: () => import('@/views/Charts.vue')
  },
  {
    name: 'Multiple Menu',
    path: 'multiple',
    meta: {
      icon: 'mdi-menu',
      text: 'Multiple Menu'
    },
    component: () => import('@/views/multiple/index.vue'),
    children: [
      {
        name: 'SecondMenu',
        path: '/multiple/second-menu',
        meta: {
          text: 'SecondMenu'
        },
        component: () => import('@/views/multiple/SecondMenu.vue')
      },
      {
        name: 'ThirdMenu',
        path: '/multiple/third-menu',
        meta: {
          text: 'ThirdMenu'
        },
        component: () => import('@/views/multiple/ThirdMenu.vue')
      }
    ]
  }
]

const routes = [
  {
    path: '/login',
    component: FullScreen
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    children: layoutRoutes
  }
]

const router = new VueRouter({
  routes
})

export default router
