// 引入
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Welcome from '../views/welcome/index.vue'
import NotFound from '@/views/404'

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
        { path: '/', component: Welcome }]
    }, {
      path: '*', component: NotFound
    }]

})

// 导出
export default router
