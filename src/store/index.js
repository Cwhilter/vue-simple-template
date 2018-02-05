import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import login from './modules/login'

Vue.use(Vuex)

const state = {
    menu_list : []
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules:{
		login
	}
})