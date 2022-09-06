// 作为store的index文件
import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
// import permission from './modules/permission'
import getters from './getters'
export default createStore({
  modules: {
    app,
    user
  },
  getters
})
