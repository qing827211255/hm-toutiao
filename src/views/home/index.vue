<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <!-- 注意三元表达式+v-bind方法 -->
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo区 -->
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <!-- 侧边导航 -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#01273d"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        style="border-right:none"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>

        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>

        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>

        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>

        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>

        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 右侧下拉菜单 -->
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <!-- 注意 这里的图片src为动态的 因此必须是:src -->
            <img :src="photo" alt class="headIcon" />
            <span class="userName">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 内容主题区域 -->

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '../../utils/local.js'
export default {
  data () {
    return {
      isOpen: true,
      name: '',
      photo: ''
    }
  },

  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    },
    setting () {
      // 点击个人设置就会路由跳转到设置
      this.$router.push('/setting')
    },
    logout () {
      // 点击退出就会路由跳转出来
      this.$router.push('/login')
    }
  },
  // 在组件初始化的时候就可以把用户名和头像对应上的功能
  created () {
    // 获取用户信息
    const user = local.getUser() || {}
    // data申明  名称 头像
    this.name = user.name
    this.photo = user.photo
  }
}
</script>

<style scoped lang="less" >
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .el-aside {
    background-color: #01273d;
    .logo {
      width: 100%;
      height: 60px;
      background: #0373e2 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
      .smallLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .headIcon {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .userName {
        margin-right: 3px;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
