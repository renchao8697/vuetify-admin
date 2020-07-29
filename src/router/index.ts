import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import FullScreen from '@/layout/fullScreen/index.vue'
import AdminLayout from '@/layout/admin/index.vue'

Vue.use(VueRouter)

export const layoutRoutes: Array<RouteConfig> = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashborad" */ '@/views/Dashboard.vue'),
    meta: {
      icon: 'mdi-palette',
      text: 'Dashboard',
      tagView: true,
      affix: true
    }
  },
  {
    name: 'Charts',
    path: '/charts',
    meta: {
      icon: 'mdi-chart-timeline-variant',
      text: 'Charts',
      tagView: true
    },
    component: () => import(/* webpackChunkName: "charts" */ '@/views/Charts.vue')
  },
  {
    name: 'Multiple Menu',
    path: '/multiple',
    redirect: '/multiple/second-menu',
    meta: {
      icon: 'mdi-menu',
      text: 'Multiple Menu',
      tagView: true
    },
    component: () => import(/* webpackChunkName: "multiple" */ '@/views/multiple/index.vue'),
    children: [
      {
        name: 'SecondMenu',
        path: '/multiple/second-menu',
        meta: {
          text: 'SecondMenu',
          tagView: true
        },
        component: () => import(/* webpackChunkName: "second-menu" */ '@/views/multiple/SecondMenu.vue')
      },
      {
        name: 'ThirdMenu',
        path: '/multiple/third-menu',
        meta: {
          text: 'ThirdMenu',
          tagView: true
        },
        component: () => import(/* webpackChunkName: "third-menu" */ '@/views/multiple/ThirdMenu.vue')
      }
    ]
  }
]

const routes: Array<RouteConfig> = [
  {
    path: '/redirect',
    component: AdminLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect.vue')
      }
    ]
  },
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
