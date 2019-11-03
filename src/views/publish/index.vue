<template>
  <div class="publish-container">
    <el-card>
      <!-- 面包屑部分 -->
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 标题框 -->
      <el-form>
        <el-form-item label="标题: ">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>

        <!-- 富文本区域 -->
        <el-form-item label="内容: ">富文本--待写</el-form-item>

        <!-- 选封面图的按钮区 -->
        <el-form-item label="封面: ">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
           <!-- 待写的上传组件 -->
        </el-form-item>

        <!-- 频道   利用封装好的频道功能-->
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>

      <!-- 发表和存入草稿按钮 -->
      <el-form-item>
        <el-button>存入草稿</el-button>
        <el-button type="primary">发表</el-button>
      </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        title: null,
        cover: {
          type: 1
        },
        channel_id: null
      }
    }
  }
}
</script>

<style>
</style>
