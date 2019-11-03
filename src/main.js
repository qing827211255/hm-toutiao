import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 是上面那种写法的完整版 import router from './router/index.js'
import axios from '@/api'
// 引入面包屑
import plugin from './components/index.js'

import '@/style/index.less'

Vue.config.productionTip = false
// 使用element-ui
Vue.use(ElementUI)
// 挂载axios
Vue.prototype.$axios = axios
// 面包屑组件
Vue.use(plugin)

new Vue({
  router, // 挂载
  render: h => h(App)
}).$mount('#app')
