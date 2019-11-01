<template>
  <div class="container-article">
    <el-card>
      <div slot="header">
        <!-- 面包屑的基本使用 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单部分 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <!-- 单选框群组 -->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道:">
          <!-- 表单元素选择器 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期:">
          <div class="block">
            <!-- <span class="demonstration">默认</span> -->
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的卡片:筛选结果布局 -->
    <el-card style="margin-top:20px">
      <!-- 表头 -->
      <div slot="header">
        <span>根据筛选条件共查询到 0 条结果：</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <!-- 自定义列的渲染之封面列 -->
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!--自定义列的渲染之发布事件列  -->
          <template slot-scope="scope">

            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag  v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===3">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <!-- 在列表中的编辑按钮与删除按钮   其中plain属性就是朴素按钮的属性 让按钮颜色变淡-->
          <el-button type="primary" icon="el-icon-edit" plain circle></el-button>
          <el-button type="danger" icon="el-icon-delete" plain circle></el-button>
        </el-table-column>
      </el-table>
      <!--  -->
      <el-pagination style="margin-top:20px" background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        // 将要传给后端的参数放在一个统一的对象中方便管理
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [], // 用来承载渲染好的下拉菜单的容器
      dateArr: [],
      articles: [] // 用来承载渲染好的文章列表项的容器
    }
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      // var res = await this.$axios.get('channels')
      // console.log(res)
      const {
        data: { data }
      } = await this.$axios.get('channels')
      this.channelOptions = data.channels
    },
    // 获取文章列表项
    async getArticles () {
      const {
        data: { data }
      } = await this.$axios.get('articles')
      this.articles = data.results
    }
  },
  created () {
    // 获取频道选项数据
    this.getChannelOptions()
    // 获取文章列表
    this.getArticles()
  }
}
</script>

<style scoped lang="less" >
</style>
