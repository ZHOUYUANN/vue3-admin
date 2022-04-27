import router from '@/router'
import { useUserStore } from '@/store/user'
import { useRouterStore } from '@/store/router'
// import { useRouter } from 'vue-router'

const whiteList = ['/login']

// 设置路由拦截器
router.beforeEach(async (to, from, next) => {
  // 获取用户信息
  const userStore = useUserStore()
  const routerStore = useRouterStore()
  // 判断用户是否登录
  if (userStore.getUserToken) {
    // 用户已登录，则不允许进入 login
    // 如果进入的是 login 则跳转到首页，其他页面可以通过
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果用户信息不存在，就通过 token 重新获取
      if (!userStore.hasLogin) {
        await userStore.getUserInfo()
        const routers = await routerStore.getUserRouters()
        // 动态添加路由
        routers.forEach((item) => {
          router.addRoute(item)
        })

        console.log(router.getRoutes())

        // 添加完动态路由之后，需要在进行一次主动跳转
        return next({ ...to, replace: true })
      }
      next()
    }
  } else {
    // 用户未登录的情况下分几种情况，可能是进的 login ，也有可能是去的 404 等
    // 所以建立白名单进行过滤，如果在白名单内就直接通过，反之则重定向至 login
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
