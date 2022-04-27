import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  }
]

export const baseRouter = [
  {
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        }
      }
    ]
  }
]

export const errorRouter = {
  path: '/:pathMatch(.*)*',
  component: 'error/404',
  hidden: true,
  meta: {
    title: '迷路了*。*'
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
