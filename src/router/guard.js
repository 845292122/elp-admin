import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '.'
import { useAuthStore } from '@/store'

const WHITE_LIST = ['/login']

router.beforeEach((to, form, next) => {
  NProgress.start()

  const authStore = useAuthStore()
  const token = authStore.token

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      if (!authStore.info) {
        authStore
          .getInfo()
          .then(permRoutes => {
            permRoutes.forEach(route => {
              router.addRoute(route)
            })
            next({ ...to, replace: true })
          })
          .catch(err => {
            ElMessage.error(err)
            authStore.logout()
            next({ path: '/' })
          })
      } else {
        next()
      }
    }
  } else {
    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
