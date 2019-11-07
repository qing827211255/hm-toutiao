<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号: ">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机号: ">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称: ">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍: ">
              <el-input v-model="userInfo.intro" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="邮箱: ">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="updatePhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
    <!-- 测试组件区域 -->
    <con-a></con-a>
    <hr />
    <con-b></con-b>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
import local from '@/utils/local'
import ConA from '../test/container-a'
import ConB from '../test/container-b'

export default {
  components: {
    ConA, // 这里的组件的写法必须跟import的相同,而上面的组件写法必须是这里的小写配合-符号
    ConB
  },
  created () {
    // 初始化时候获取页面信息
    this.getUserInfo()
  },

  data () {
    return {
      userInfo: {
        id: null,
        mobile: null,
        name: null,
        intro: null,
        email: null,
        photo: null
      }
      // imageUrl: null

    }
  },
  methods: {
    async  getUserInfo () {
      const { data: { data } } = await this.$axios.get('user/profile')
      this.userInfo = data
    },
    // 保存用户信息(不包含头像)
    async saveInfo () {
      // 用户点击保存后,触发的这个函数,目的:将信息发给后端让他保存
      await this.$axios.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })

      // 给后端之后要给用户提示成功
      this.$message('保存成功')
      // 更新home组件的用户名--->用到了非父子传值 $emit(自定义名称,要传过去的值)
      eventBus.$emit('updateName', this.userInfo.name)
      // 更新本地存储的用户名
      // 1.获取本地存储的用户名
      const user = local.getUser()
      // 2.把最新的赋值给原来的(这里的user是个对象,可以在控制台里的application中看到具体对象)
      user.name = this.userInfo.name
      // 3.设置本地存储的方式保存起来
      local.setUser(user)
    },
    // 更新用户头像函数
    async updatePhoto (result) {
      console.log(result)
      // 获取图片文件数据(注意element-ui给传过来的参数对象里包含着头像文件)
      const file = result.file
      // 创一个formData
      const formData = new FormData()
      // 追加图片到formdata,字段名字和后台要一致
      formData.append('photo', file)
      // 使用axios提交数据
      const { data: { data } } = await this.$axios.patch('user/photo', formData)
      // 拿着上传成功的地址进行预览
      this.userInfo.photo = data.photo
      // 提示
      this.$message.success('上传成功')
      // 更新home组件的photo
      eventBus.$emit('updatePhoto', this.userInfo.photo)
      // 更新本地存储的photo
      // 1.获取本地存储的
      const user = local.getUser()
      // 2. 把更改的赋值
      user.photo = this.userInfo.photo
      // 3.设置成本地存储
      local.setUser(user)
    }
  }
}
</script>

<style scope lang="less">
</style>
