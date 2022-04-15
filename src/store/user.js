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
      userInfo: {}
    }
  },
  actions: {
    userLogin(data) {
      return new Promise((resolve) => {
        login(data).then(({ token }) => {
          // 设置 token
          this.token = token
          // 登录成功，设置 token
          setStorage(TOKEN, token)
          // 登录时间，保存当前时间戳
          setTimestamp()
          resolve()
        })
      })
    },
    userLogout() {
      // 清空所有缓存数据
      clearStorage()
      // 清空登录信息
      this.token = ''
      this.userInfo = {}
      // 跳转到登录页面
      router.push('/login')
    },
    async getUserInfo() {
      // 获取用户信息
      const res = await getUserInfo()
      // 保存用户信息到 store
      this.userInfo = res
      return res
    }
  },
  getters: {
    getUserToken: (state) => state.token,
    hasLogin: (state) => JSON.stringify(state.userInfo) !== '{}'
  }
})
