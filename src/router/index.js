import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

var routes = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "views" */ '@/views/Login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "views" */ '@/views/Index'),
      meta: {
        requireAuth: true // 添加需要权限的标记
      }
    },
    {
      path: '/',
      redirect: 'index'
    }
  ]
})
routes.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    if (sessionStorage.getItem('token')) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
export default routes
