import * as types from './mutation-types'
import * as api from '../api/login'

export default {
    //通过API获取菜单列表
    get_menu_list({commit},user_id){
        api.get_menu_list(user_id,(menu_list) => {
            commit(types.SET_MENU,menu_list)
        },(error) => {

        })
    }   
}