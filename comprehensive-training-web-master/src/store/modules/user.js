import { login, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookie from 'js-cookie'
import SHA256 from 'js-sha256'

const user = {
  state: {
    token: getToken(),
    name: '',
    userId: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_UserID: (state, userId) => {
      state.userId = userId
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录，在login.vue使用
    Login({ commit }, userInfo) {
      //console.log(SHA256(userInfo.password))
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, SHA256(userInfo.password))
          .then((response) => {
            console.log(response)
            //console.log('2222222222222')
            window.sessionStorage.setItem('token1', response.data)
            const token = response.data
            console.log(token)
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response) => {
            const data = response.data
            console.log(response)
            //console.log('11111111111')
            sessionStorage.setItem('accountID', data.accountId)
            if (data.userName && data.userName.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_NAME', data.userName)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_UserID', data.id)
            Cookie.set('userID', data.id)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        // s实现路由守卫
        window.sessionStorage.setItem('token1', '')
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
