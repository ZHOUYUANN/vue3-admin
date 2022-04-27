import { defineStore } from 'pinia'
import { getRouters } from '@/api/router'
import { baseRouter, errorRouter } from '@/router'
import { formateAsyncRouters, formateRouters } from '@/utils/router'

export const useRouterStore = defineStore({
  id: 'router',
  state() {
    return {
      sidebarRouters: []
    }
  },
  actions: {
    async getUserRouters() {
      const { routers } = await getRouters()
      // 合并默认路由和用户路由
      const allRouter = baseRouter.concat(routers)
      // 把错误页面添加到路由中
      allRouter.push(errorRouter)
      // 格式化路由
      const asyncRouters = formateAsyncRouters(allRouter)
      // 删选可用侧边栏路由
      const sidebarRouters = formateRouters(asyncRouters)
      console.log('sidebarRouters', sidebarRouters)
      // 保存路由到 store 中
      this.sidebarRouters = sidebarRouters

      return asyncRouters
    }
  },
  getters: {
    getSidebarRouters: (state) => state.sidebarRouters
  }
})
