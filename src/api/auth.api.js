import { service } from '@/utils'

const baseURL = '/auth'

export const AuthApi = {
  login: data => service.post(`${baseURL}/login`, data),
  info: () => service.get(`${baseURL}/info`),
  update: data => service.post(`${baseURL}/update`, data),
  updatePwd: data => service.post(`${baseURL}/updatePwd`, data)
}
