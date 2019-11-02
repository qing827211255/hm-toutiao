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
        <el-radio-group v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材 -->
        <el-button type="success" size="small" style="float:right">添加素材</el-button>
      </div>

      <!-- 素材区部分   没有第三方的 需要自己写出来结构-->
      <div class="img_list">
        <div class="img_item" v-for="index in 10" :key="index">
          <img src="../../assets/avatar.jpg" alt />
          <div class="img_footer">
            <span class="el-icon-star-off red"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>

      <!-- 分页部分 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: 'false'
      }
    }
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
    border: 1px dashed rgb(29, 28, 28);
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
        margin:0 20px;
          &.red {   //要注意   // span .red{} 选择器无效 但是span &.red{} 选择器有效  &连接符
            color:red;
          }
      }
    }
  }
}
</style>
