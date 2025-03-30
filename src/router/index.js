import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录',
        layout: 'blank'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '页面飞走了'
      }
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
