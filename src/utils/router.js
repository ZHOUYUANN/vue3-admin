import path from 'path'
import Layout from '@/layout'
import { isNull } from '@/utils/utils'

// 格式化拼接路由并转换路由格式
export const formateAsyncRouters = (routers, parent) => {
  return routers.map((router) => {
    const currentRouter = {
      ...router,
      component:
        router.component === 'Layout' ? Layout : loadView(router.component)
    }
    // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
    if (router.children && router.children.length > 0) {
      currentRouter.children = formateAsyncRouters(
        router.children,
        currentRouter.path
      )
    } else {
      delete currentRouter.children
    }
    return currentRouter
  })
}

// 删选可用侧边栏路由
export const formateRouters = (routers, basePath = '') => {
  const result = []
  // 遍历路由表
  routers.forEach((router) => {
    // 过滤属性 hidden 为 true 的路由
    if (router.hidden) return
    // 过滤没有 children 并且没有 meta 的路由项
    if (isNull(router.children) && isNull(router.meta)) return
    // 如果有 children 但是没有 meta
    if (!isNull(router.children) && isNull(router.meta)) {
      // 如果 children 为空，则添加到结果中
      result.push(...formateRouters(router.children))
      return
    }
    // 如果有 meta 但是没有 children
    // 1. 先合并 path
    const routePath = path.resolve(basePath, router.path)
    // 2. 判断是否有同名路径
    let samePath = result.find((item) => item.path === routePath)
    // 3. 没有同名路径就添加到 result 中
    if (!samePath) {
      samePath = {
        ...router,
        path: routePath,
        children: []
      }
      // 如果有 title 的情况下就是 需要显示路由
      if (samePath.meta.icon && samePath.meta.title) {
        result.push(samePath)
      }
    }
    // 如果 children 和 meta 都存在
    if (router.children) {
      samePath.children.push(...formateRouters(router.children, router.path))
    }
  })
  return result
}

// import 加载路由页面
function loadView(view) {
  return () => require.ensure([], (require) => require(`../views/${view}`))
}
