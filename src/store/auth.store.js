import { AuthApi } from '@/api'
import { TokenUtil } from '@/utils'
import { defineStore } from 'pinia'
import { RouteUtil } from '../utils'
import { bizRoutes } from '../router/routes'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: TokenUtil.getToken(),
    permRoutes: [],
    info: undefined
  }),
  actions: {
    login(loginInfo) {
      const { phone, password } = loginInfo
      return new Promise((resolve, reject) => {
        AuthApi.login({ phone, password })
          .then(res => {
            TokenUtil.setToken(res)
            this.token = res
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        AuthApi.info()
          .then(res => {
            const { info, perms } = res
            const permRoutes = RouteUtil.filterRoutesByPermAndHidden(bizRoutes, perms)
            this.info = info
            this.permRoutes = permRoutes
            resolve(permRoutes)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout() {
      this.token = ''
      this.permRoutes = []
      this.info = undefined
      TokenUtil.removeToken()
    },
    updateInfo(authInfo) {
      return new Promise((resolve, reject) => {
        AuthApi.updateInfo(authInfo).then(res => {
          AuthApi
        })
      })
    }
  }
})
