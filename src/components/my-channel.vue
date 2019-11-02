<template>
  <el-select :value="value"  @change="fn" clearable placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []

    }
  },
  methods: {
    // 频道改变函数
    fn (channelId) {
      // 清空值是'' 改成null
      if (channelId === '') channelId = null
      // 把ID提交给父组件

      this.$emit('input', channelId) // 这里的input是固定写法,只要是子传父,第一个参数就是input
    },
    // 获取频道选项数据
    async getChannelOption () {
      const { data: { data } } = await this.$axios.get('channels')
      this.channelOptions = data.channels
    }
  },
  created () {
    this.getChannelOption()
  }
}
</script>

<style>
</style>
