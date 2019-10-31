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
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item. value"
              :label="item.label"
              :value="item. value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期:">
          <div class="block">
            <!-- <span class="demonstration">默认</span> -->
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的卡片:筛选结果布局 -->
    <el-card style="margin-top:20px">
      <!-- 表头 -->
      <div slot="header">
        <span>根据筛选条件共查询到 0 条结果：</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="发布时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px"   background layout="prev, pager, next" :total="1000"></el-pagination>
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
        end_pubdate: null
      },
      channelOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        }
      ],
      dateArr: [],
      articles: []
    }
  }
}
</script>

<style scoped lang="less" >
</style>
