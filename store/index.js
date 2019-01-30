import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
import cartModule from './modules/cart'
// import types from './types'
// const debug = true
// const getters = {}
const state = {
  userInfo: ''
}
const actions = {
  updateUserInfo ({commit}, data) {
    commit('updateUserInfo', data)
  }
}
const mutations = {
  updateUserInfo (data) {
    state.userInfo = data
  }
}
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    cartModule
  },
  state,
  actions,
  // getters,
  mutations
  // strict: debug, // 设置运行模式
  // plugin: debug ? [createLogger()] : [] //调试模式加入日志插件
})
