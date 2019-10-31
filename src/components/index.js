// 封装一个插件
import MyBread from './my-bread.vue'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
