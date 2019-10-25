import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 是上面那种写法的完整版 import router from './router/index.js'

Vue.config.productionTip = false
// 使用element-ui
Vue.use(ElementUI)

new Vue({
  router, // 挂载
  render: h => h(App)
}).$mount('#app')
