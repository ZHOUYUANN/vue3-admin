import router from '@/router'
import { defineStore } from 'pinia'
import { TOKEN } from '@/utils/constant'
import { setTimestamp } from '@/utils/auth'
import { setStorage, getStorage, clearStorage } from '@/utils/storage'
import { login, getUserInfo } from '@/api/login'

export const useUserStore = defineStore({
  id: 'user',
  state() {
    return {
      token: getStorage(TOKEN) || '',
      userInfo: {},
      roles: []
    }
  },
  actions: {
    async userLogin(data) {
      const { token } = await login(data)
      // 设置 token
      this.token = token
      // 登录成功，设置 token
      setStorage(TOKEN, token)
      // 登录时间，保存当前时间戳
      setTimestamp()
    },
    userLogout() {
      // 清空所有缓存数据
      clearStorage()
      // 清空登录信息
      this.token = ''
      // 清空用户信息
      this.userInfo = {}
      // 跳转到登录页面
      router.replace('/login')
    },
    async getUserInfo() {
      // 获取用户信息
      const res = await getUserInfo()
      // 保存用户信息到 store
      this.userInfo = res
      // 保存用户权限
      this.roles = res.roles
      return res
    }
  },
  getters: {
    getUserToken: (state) => state.token,
    hasLogin: (state) => JSON.stringify(state.userInfo) !== '{}'
  }
})
