import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, removeToken, getIsLoadNodes, setIsLoadNodes, removeIsLoadNodes } from '@/utils/auth' // getToken from cookie
import { getMenusTreeByRole } from '@/api/admin/menu'
import { filterAsyncRouter } from './store/modules/permission'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

if (getToken()) {
  removeIsLoadNodes()
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      removeIsLoadNodes()
      removeToken()
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      const isLoadNodes = getIsLoadNodes()
      if (!isLoadNodes) {
        store.dispatch('getUserInfo').then(() => {
          getMenusTreeByRole(store.getters.roleId).then(res => {
            if (res.code === 1000 && res.data) {
              const asyncRouter = filterAsyncRouter(res.data)
              asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
              store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
                router.addRoutes(asyncRouter) // 动态添加可访问路由表
                next({ ...to, replace: true })// hack方法 确保addRoutes已完成
              })
              setIsLoadNodes('true')
            }
          })
        }).catch(() => {
          console.log('getUserInfo error...')
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
