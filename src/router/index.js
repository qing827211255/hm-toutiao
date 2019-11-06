// 引入
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Welcome from '../views/welcome/index.vue'
import NotFound from '@/views/404'
import local from '../utils/local.js'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

// 使用
Vue.use(VueRouter)

// 实例化
var router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        // 欢迎页面
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/image', component: Image },
        { path: '/publish', component: Publish },
        { path: '/comment', component: Comment }]
    },
    {
      path: '*', component: NotFound
    }]

})

// 前置路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取到用户的token
  // console.log(user)----辅助观察
  // to 跳转目标路由对象
  // next() 放行  next('/login') 拦截到登录
  const user = local.getUser()
  if (to.path !== '/login' && !user) {
    return next('/login')
  }
  next()
})

// 导出
export default router
