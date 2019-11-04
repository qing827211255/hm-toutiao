<template>
  <div class="container">
    <el-card>
      <!-- 面包屑部分 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!--按钮部分  -->
      <div class="btn_box">
        <!-- 全部与收藏 -->
        <el-radio-group v-model="reqParams.collect" @change="toggleList">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材 -->
        <el-button @click="open" type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <!-- 上传素材的提示框 -->
      <!-- action 是图片上传的接口地址 -->
      <!-- 因为是upload组件,不是自己设置过的的axios组件,需要设置请求头 携带token -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :on-success="handleSuccess"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>

      <!-- 素材区部分   没有第三方的 需要自己写出来结构-->
      <div class="img_list">
        <!-- 因为这里存在遍历循环,所以下面涉及到的id或者is_collected或者url都需要item.表明对象 -->
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="img_footer">
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggleStatus(item)"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
        </div>
      </div>

      <!-- 分页部分 -->
      <!-- 饿了么自动把@current-page的函数参数给传到下面的函数部分,因此不用特意写pager(newPage) -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        @current-change="pager"
        :current-page="reqParams.page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import local from '../../utils/local.js'

export default {
  data () {
    return {
      reqParams: {
        collect: 'false',
        page: 1,
        per_page: 10
      },
      dialogVisible: false,
      images: [],
      total: 0,
      imageUrl: null, // 上传成功后的图片地址
      headers: {
        // 给upload组件额外设置请求头
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    // 1 获取图片列表
    async getImages () {
      const {
        data: { data }
      } = await this.$axios.get('/user/images', { params: this.reqParams })

      this.images = data.results
      this.total = data.total_count
    },
    // 2 点击分页按钮 显示对应的图片列表
    pager (newPage) {
      // 先把当前页赋值给要传到后端的参数
      this.reqParams.page = newPage
      // 向后端请求重新获取列表
      this.getImages()
    },
    // 3 实现点击收藏和全部,列表的切换功能
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 4. 实现功能:点击星星切换是否为收藏的状态
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$axios.put(`/user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 5 删除功能
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$axios.delete(`/user/images/${id}`)
          this.getImages()
        })
        .catch(() => {})
    },
    // 6 素材上传成功函数
    handleSuccess (res) {
      // res 就是响应主体  res.data.url 就是图片地址
      // 预览
      this.imageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
      // 设置定时器
      window.setTimeout(() => {
        // 关闭
        this.dialogVisible = false
        // 更新列表
        this.getImages()
      }, 2000)
    },
    // 7  设置点击"添加按钮"的立即清空(之前留下的上传痕迹)功能
    open () {
      // 显示对话框
      this.dialogVisible = true
      this.imageUrl = ''
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style scope lang="less">
.img_list {
  margin-top: 20px;
  .img_item {
    display: inline-block; //解决不在一行显示的方法
    width: 180px;
    height: 180px;
    border: 1px dashed rgb(211, 209, 209);
    position: relative;
    margin-right: 29px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .img_footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: white;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      span {
        margin: 0 20px;
        &.red {
          //要注意   // span .red{} 选择器无效 但是span &.red{} 选择器有效  &连接符
          color: red;
        }
      }
    }
  }
}

</style>
