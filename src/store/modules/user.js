import { login, getUserInfoByToken } from '@/api/login'
import { getToken, setToken, removeToken, removeIsLoadNodes } from '@/utils/auth'
import { parseTime } from '@/utils/index'

const user = {
  state: {
    token: getToken(),
    userId: '',
    name: '',
    email: '',
    avatar: '',
    createTime: '',
    roles: [],
    roleId: '',
    userStatus: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLE_ID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_CREATE_TIME: (state, createTime) => {
      state.createTime = createTime
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_USER_STATUS: (state, userStatus) => {
      state.userStatus = userStatus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const userName = userInfo.userName
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(userName, password).then(res => {
          const data = res.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_ID', data.userId)
          commit('SET_ROLE_ID', data.roleId)
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_EMAIL', data.email)
          commit('SET_CREATE_TIME', parseTime(data.addTime))
          commit('SET_USER_STATUS', data.userStatus)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据token获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfoByToken(getToken()).then(res => {
          const data = res.data
          commit('SET_ROLE_ID', data.roleId)
          commit('SET_USER_ID', data.userId)
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_EMAIL', data.email)
          commit('SET_CREATE_TIME', parseTime(data.addTime))
          commit('SET_USER_STATUS', data.userStatus)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE_ID', '')
        removeIsLoadNodes()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
