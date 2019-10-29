<template>
  <div class="container">
    <el-card>
      <img src="../../assets/logo_index.png" alt />

                              <!-- ref来获取dom元素 -->
      <el-form :model="LoginForm" ref="LoginForm" :rules="LoginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>

          <el-button>发送验证码</el-button>
        </el-form-item>

        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '../../utils/local.js'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 1开头 第二位3-9之间  9位数结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式有误'))
      }
    }
    return {
      LoginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }

        ]
      }
    }
  },

  methods: {
    login () {
      // 触发了登录按钮的点击事件,就对上面两个输入框校验

      // this.$refs['LoginForm'].validate((valid) => {
      //   if (valid) {
      //     console.log('可以发请求登录')
      //     this.$axios.post('authorizations', this.LoginForm).then(res => {
      //       // ---设置token保存用户登录的状态
      //       // console.log(res)

      //       local.setUser(res.data.data)

      //       this.$router.push('/')
      //     }).catch(() => {
      //       // 使用饿了么提供的提示框
      //       this.$message.error('登录名或密码错误')
      //     })
      //   }
      // })

      // 对表单验证的代码优化
      this.$refs['LoginForm'].validate(async valid => {
        if (valid) {
          try {
            const { data: { data } } = await this.$axios.post('authorizations', this.LoginForm)
            // 获取token
            local.setUser(data)
            // 跳转到首页
            this.$router.push('/')
          } catch (e) {
            this.$message.error('登录名或密码错误')
          }
        }
      })
    }

  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background-color: rgb(212, 109, 25);
  position: absolute;
  left: 0;
  top: 0;
  // 注意文件的路径,要有后缀名,该模式下智能模式提示不是很友好
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;

  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 26px;
    }
  }
}
</style>
