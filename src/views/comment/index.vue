<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table
        :data="articles">
        <!-- 表格宽度待调整 -->
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" ></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column  label="状态">
            <!--这里是跟随变化的标签 要使用作用域插槽-->
           <template slot-scope="scope">{{scope.row.comment_status?"正常":"关闭"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
              <template slot-scope="scope">

                   <!-- 这里scope.row代表的是item 包含着 prop -->
                  <el-button @click="toggleStatus(scope.row)" v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
                   <el-button   @click="toggleStatus(scope.row)"  v-else type="success" size="small">打开评论</el-button>
              </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
      articles: [],
      reqParams: {
        total: 0,
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      // 总条数
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 获取评论
    async getArticles () {
      // 这里的get获取方式,参数传对象
      const { data: { data } } = await this.$axios.get('articles', { params: this.reqParams })
      //  后端拿到的结果赋值到前端的容器里
      this.articles = data.results
      this.total = data.total_count
    },
    // 分页函数
    pager (newPage) {
      // 修改当前页码为新的页码--->点哪一页就把这页的页码发请求给后端
      this.reqParams.page = newPage
      this.getArticles()
    },
    toggleStatus (row) {
      // console.log(row) --->可以看到row.id
      const text = row.comment_status ? '您确定要打开评论功能?' : '您确定要关闭评论?'
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 给后端发请求
        const { data: { data } } = await this.$axios.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
        this.$message(data.allow_comment ? '打开评论成功' : '关闭评论')
        // 更新当前按钮的状态
        row.comment_status = data.allow_comment
      }).catch(() => {})
    }

  }
}
</script>

<style>
</style>
