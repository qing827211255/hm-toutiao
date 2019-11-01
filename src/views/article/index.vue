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
          <el-select v-model="reqParams.channel_id" clearable placeholder="请选择">
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
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              value-format="yyyy-MM-DD"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的卡片:筛选结果布局 -->
    <el-card style="margin-top:20px">
      <!-- 表头 -->
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果：</span>
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
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===3">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <!-- 在列表中的编辑按钮与删除按钮   其中plain属性就是朴素按钮的属性 让按钮颜色变淡-->
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="toEdit(scope.row.id)"
              icon="el-icon-edit"
              plain
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="delArticle(scope.row.id)"
              icon="el-icon-delete"
              plain
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页  -->
      <!-- total 总条数 -->
      <!-- page-size 默认一页显示10条   要告诉后台我需要多少条,后端才能给出足够的数据量-->
      <!-- current-page 指定当前激活的按钮 -->
      <el-pagination
        style="margin-top:20px"
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
export default {
  data () {
    return {
      reqParams: {
        // 将要传给后端的参数放在一个统一的对象中方便管理
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        per_page: 10,
        page: 1 // 向后端求取需要展示第几页的数据
      },
      total: 0, // 用来渲染总条数的容器
      channelOptions: [], // 用来承载渲染好的下拉菜单的容器
      dateArr: [],
      articles: [] // 用来承载渲染好的文章列表项的容器
    }
  },
  methods: {
    // 1获取频道选项数据
    async getChannelOptions () {
      // var res = await this.$axios.get('channels')
      // console.log(res)
      const {
        data: { data }
      } = await this.$axios.get('channels')
      this.channelOptions = data.channels
    },
    // 2获取文章列表项
    async getArticles () {
      const {
        data: { data }
        // 不要忘记给后端传想要请求的参数
      } = await this.$axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 3总条数数据赋值
      this.total = data.total_count
    },
    // 4 分页切换函数
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取文章列表
      this.getArticles()
    },
    // 5 筛选功能
    search () {
      // 获取筛选数据（准备日期数据） 处理频道空字符串问题
      if (this.reqParams.channel_id === '') {
        return (this.reqParams.channel_id = null)
      }
      // 把页码换成1,并且重新获取列表
      this.page = 1
      this.getArticles()
    },
    // 6 日期筛选功能
    changeDate (dateArr) {
      // console.log(dateArr) 观察返回的原始数据日期格式
      // dateArr 是数组 [date,date]  起始时间  结束时间
      // 注意：清空日期之后，dateArr是null  对应的 begin end 值也该为null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 7 编辑功能
    toEdit (id) {
      // 跳转带参数的首选方法
      this.$router.push({ path: '/publish', query: { id } })
    },

    // 8 删除功能
    async  delArticle (id) {
      await this.$axios.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除成功')
      // 更新列表
      this.getArticles()
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
