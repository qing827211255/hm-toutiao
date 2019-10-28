<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <!-- 注意三元表达式+v-bind方法 -->
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo区 -->
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <!-- 侧边导航 -->
      <el-menu
        default-active="2"
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
            <img src="../../assets/avatar.jpg" alt class="headIcon" />
            <span class="userName">管理员</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
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
export default {
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    }
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
