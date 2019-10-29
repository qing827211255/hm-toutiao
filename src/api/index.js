// 导出一个配置好的axios提供给main挂载
import axios from 'axios'
import local from '../utils/local.js'
import router from '../router/index.js'

// 对axios进行配置
// baseURL  作用：设置基准地址（前面一段相同的地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 设置请求拦截器---->给用户的请求配置好有token的请求头
axios.interceptors.request.use(config => {
  // 1. 获取token
  const user = local.getUser() || {}
  // 2.配置头部授权的token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 设置响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取响应对象  error.response
  if (err.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
