<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs选项卡 -->
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>用户名</p>
              <el-button type="primary" size="small" plain>+关注</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pic">
          <!-- echarts的使用 -->
          <div ref="dom" style="height:400px;width:600px"></div>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import circleUrl from '../../assets/avatar.jpg'
import echarts from 'echarts'

export default {
  data () {
    return {
      circleUrl,
      activeName: 'list',
      total: 0,

      reqParams: {
        page: 1,
        per_page: 21
      },
      fansList: []
    }
  },
  methods: {
    // 获取粉丝列表 (query传参)
    async getFansList () {
      const {
        data: { data }
      } = await this.$axios.get('followers', { params: this.reqParams })
      this.fansList = data.results
      // 将页码从后端请求回来
      this.total = data.total_count
    },
    // 分页功能
    pager (newPage) {
      // 赋值
      this.reqParams.page = newPage
      // 重新获取网页
      this.getFansList()
    }
  },
  created () {
    // 获取数据
    this.getFansList()
  },
  // echart作为dom渲染需要在mounted函数中渲染
  mounted () {
    const dom = this.$refs.dom // 获取dom元素
    // 初始化
    const myEcharts = echarts.init(dom)
    // 定义echarts的内容
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 使用echart
    myEcharts.setOption(option)
  }
}
</script>

<style scoped lang="less">
.fans_item {
  width: 150px;
  height: 190px;
  border: 1px dashed rgb(241, 189, 189);
  text-align: center;
  padding-top: 20px;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
