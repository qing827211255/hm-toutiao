<template>
  <div class="publish-container">
    <el-card>
      <!-- 面包屑部分 -->
      <div slot="header">
        <!-- 这里是修改逻辑的第一处 -->
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 标题框 -->
      <el-form>
        <el-form-item label="标题: ">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>

        <el-form-item label="内容: "></el-form-item>
        <!-- 富文本区域    第三方插件 quill-editor-->
        <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>

        <!-- 选封面图的按钮区 -->
        <el-form-item label="封面: ">
          <!--当单选框发生变化时就清空之前选择图片留下的地址 -->
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封装好的图片上传的组件 -->
          <!-- 封面组件实现双向绑定父子传值,后端是用数组放着图片的url的-->
          <!-- 根据类型 决定渲染组件的个数-->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>

          <div v-if="articleForm.cover.type===3">
            <!-- 注意:这种遍历循环3个方法 以及不要v-for的使用必须配合唯一的key -->
            <my-image v-for="index in 3" :key="index" v-model="articleForm.cover.images[index-1]"></my-image>
          </div>
        </el-form-item>

        <!-- 频道   利用封装好的频道功能-->
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>

        <!-- 发表和存入草稿按钮 -->

        <el-form-item v-if="$route.query.id" >
          <el-button @click="update(true)">修改至草稿</el-button>
          <el-button type="success" @click="update(false)">修改</el-button>
        </el-form-item>
            <!-- 此处是修改逻辑的第三处 按钮部分 -->
        <el-form-item   v-else >
          <el-button @click="create(true)">存入草稿</el-button>
          <el-button type="primary" @click="create(false)">发表</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本编辑器的引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        // 给后端要传的参数
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image'] // 老师给补充的图片工具 在博客说明书上面没有看到
          ]
        }
      }
    }
  },
  created () {
    // 根据地址栏是否有id这个参数来判断是否为修改文章的界面
    const articleId = this.$route.query.id // http://localhost:8080/#/publish?id=e23r44
    if (articleId) {
      // 在template中修改逻辑--->面包屑是第一处
      // 填充表单内容---->修改逻辑的第二处
      this.getArticle(articleId)
    }
  },
  methods: {
    // 给后端传新文章的请求,要把将发表的文章的标题,内容,封面参数飞去
    async create (draft) {
      await this.$axios.post(`articles?draft=${draft}`, this.articleForm)
      // 请求成功后的提示
      this.$message.success(draft ? '存为草稿成功' : '发表成功')
      // 页面的跳转
      this.$router.push('/article')
    },

    // 获取指定id文章的详情
    async getArticle (id) {
      const {
        data: { data }
      } = await this.$axios.get(`articles/${id}`)
      this.articleForm = data
    }
  },
  watch: {
    // 监听地址栏参数变化，切换填充表单还是重置表单
    // key===>被监听的(this下的)数据的字段的名字
    // value ===> 值改变后触发的函数 (newVal,oldVal) 新值  旧值
    // 监听是否有文章的id,有id就是新值
    // 不可以使用箭头函数
    '$route.query.id': function (newVal, oldVal) {
      if (newVal) {
        // 修改-填充表单--->获取传了参的表单
        this.getArticle(newVal)
      } else {
        // 重置表单
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }

        }
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
