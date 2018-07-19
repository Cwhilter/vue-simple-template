import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import login from './modules/login'

Vue.use(Vuex)

const state = {
		lang: 'zh-CN',
		leftMenuList: [],
    pageOpenedList: [
    ]
}
if (module.hot) {
	// 使 action 和 mutation 成为可热重载模块
	module.hot.accept(['./mutations', './actions', './getters', './modules/login'], () => {
	  // 获取更新后的模块
	  // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
	  const newMutations = require('./mutations').default
	  const newGetters = require('./getters').default	  
	  const newActions = require('./actions').default	  
	  const newModuleLofin = require('./modules/login').default
	  // 加载新模块
	  store.hotUpdate({
		mutations: newMutations,
		getters: newGetters,
		actions: newActions,
		modules: {
		  login: newModuleLogin
		}
	  })
	})
  }
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules:{
		login
	},
	strict: process.env.NODE_ENV !== 'production'
})

