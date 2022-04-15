import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { isCheckTimeout } from '@/utils/auth'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000
})

// 设置请求拦截器
http.interceptors.request.use(
  (res) => {
    const user = useUserStore()
    if (user.token) {
      if (isCheckTimeout()) {
        user.userLogout()
        ElMessage.error('登录超时，请重新登录')
        return Promise.reject(new Error('登录超时，请重新登录'))
      }
      res.headers['X-Access-Token'] = user.token
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 设置相应拦截器
http.interceptors.response.use(
  (res) => {
    const { success, message, data } = res.data
    // 可以用 success 或者 code 来判断用户是否是失败的状态，根据项目来
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(message)
    }
  },
  (err) => {
    if (err.response.status === 404) {
      ElMessage.error('接口未找到，登录失败，请联系管理员')
    }

    return Promise.reject(err)
  }
)

export default http
