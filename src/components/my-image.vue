<template>
  <!-- 上传组件区域 -->
  <div class="my-image">
    <!--  按钮-->
    <div class="btn_box" @click="open">
  <!-- 父子传值 子组件要么显示父亲给的value要么显示默认  注意value||dafaultImage的顺序不可以变化 -->
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部与收藏按钮 -->
          <el-radio-group v-model="reqParams.collect" @change="toggleList" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!--全部收藏的图片 列表 -->
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            @current-change="pager"
            :current-page="reqParams.page"
          ></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传组件   on-success是上传函数-->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <!-- uploadImageUrl是上传处预览图的图床 -->
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '../utils/local.js'
import defaultImage from '../assets/default.png'

export default {
  name: 'my-image',
  props: ['value'], // 父传给子组件值时候,子组件接收
  data () {
    return {
      defaultImage, // 默认的按钮图
      reqParams: {
        collect: 'false',
        page: 1,
        per_page: 6
      },
      selectedImageUrl: null,
      activeName: 'image', // 上传组件中的标签栏默认选中素材库
      dialogVisible: false,
      images: [],
      total: 0,
      uploadImageUrl: null, // 上传成功后的图片地址
      headers: {
        // 给upload组件额外设置请求头
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    //     8. 把图片显示到最外层的预览窗口中
    confirmImage () {
      // 当是素材库界面时
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) { // 判断是否为空
          return this.$message.warning('请挑选一张图')
        }
        // 给img的src赋值图片地址
        // this.defaultImage = this.selectedImageUrl
        //  子组件的提交图片地址要传给父组件
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
        // 当是上传图片界面
      } else {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请上传一张图') // 判断是否为空
        }
        // 给img的src赋值图片地址
        // this.defaultImage = this.uploadImageUrl
        // 把这个默认图的提交地址传给父亲
        this.$emit('input', this.uploadImageUrl)
        this.dialogVisible = false
      }
    },
    // 7.给选中的图添加选中遮罩样式
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 6 上传成功函数
    handleSuccess (res) {
      //     上传的处的预览
      this.uploadImageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
    },

    // 1打开对话框
    open () {
      this.selectedImageUrl = '' // 清空选中的样式的图床
      this.uploadImageUrl = '' // 清空上床的图床
      this.dialogVisible = true
      this.getImages()
    },
    // 3 切换全部与收藏的函数
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 2获取图片列表函数
    async getImages () {
      const {
        data: { data }
      } = await this.$axios.get('/user/images', { params: this.reqParams })

      this.images = data.results
      this.total = data.total_count
    },

    // 5分页函数
    pager (newPage) {
      // 先把当前页赋值给要传到后端的参数
      this.reqParams.page = newPage
      // 向后端请求重新获取列表
      this.getImages()
    }
  }
}
</script>

<style scoped lang="less">
.my-image {
  display: inline-block;  // 保证三图的时候 是在一行显示的
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed rgb(235, 154, 154);
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}

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
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
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
