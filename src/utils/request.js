import { useAuthStore } from '@/store'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { TokenUtil } from './auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 重新登录
const router = useRouter()

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
  // timeout: 10000
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  req => {
    const token = TokenUtil.getToken()
    if (token) {
      req.headers['Authorization'] = 'Bearer ' + token
    }

    return req
  },
  err => {
    Promise.reject(err)
  }
)

/**
 * 响应拦截器
 * TODO 文件响应处理
 */
service.interceptors.response.use(
  resp => {
    // const status = resp.status
    const result = resp.data

    return Promise.resolve(result)
  },
  err => {
    let { status, data } = err.response

    if (status === 401) {
      useAuthStore().logout()
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (status === 403) {
      ElMessage.warning('权限不足,请联系管理员!')
      return Promise.reject(new Error(data))
    }

    ElMessage({ message: data, type: 'error', duration: 5 * 1000 })
    return Promise.reject(err)
  }
)

// 通用下载方法
export function download(url, params, filename, config) {
  downloadLoadingInstance = ElLoading.service({
    text: '正在下载数据，请稍候',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return service
    .post(url, params, {
      transformRequest: [
        params => {
          return tansParams(params)
        }
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config
    })
    .then(async data => {
      const isBlob = blobValidate(data)
      if (isBlob) {
        const blob = new Blob([data])
        saveAs(blob, filename)
      } else {
        const resText = await data.text()
        const rspObj = JSON.parse(resText)
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
        ElMessage.error(errMsg)
      }
      downloadLoadingInstance.close()
    })
    .catch(r => {
      ElMessage.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close()
    })
}

export { service }
