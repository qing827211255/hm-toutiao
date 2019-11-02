// 封装一个插件
import MyBread from './my-bread.vue'
import MyChannel from './my-channel.vue'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
