import * as api from 'api/login'

const state = {
    cluster_list :[],
}
const getters = {

}
const actions = {
    //通过API获取菜单列表
    get_menu_list({commit},user_id){
        api.get_menu_list(user_id,(res) => {
            console.log(res.data)
        },(error) => {

        })
    }   
}
const mutations = {

}
export default {
    state,
    getters,
    actions,
    mutations
}