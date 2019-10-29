const KEY = 'hm-toutiao-pc-user-key'
const local = {
  // 设置用户
  setUser (user) {
    //     把用户传来的替换现在这个默认的保存到sessionstorage当中
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    var jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }

}
export default local
