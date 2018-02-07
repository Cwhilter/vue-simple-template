import * as types from './mutation-types.js'

export default {
    //获取菜单
    [types.SET_MENU](state,menu_list) {
        state.menu_list = menu_list;
    },
    //置空菜单列表
    [types.CLEAR_MENU](state){
        state.menu_list = [];
    },
    [types.SET_LANG](state,lang){
        state.lang = lang;
    }
}