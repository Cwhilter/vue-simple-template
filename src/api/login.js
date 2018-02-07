import axios from './api.inc'

export const get_user_info = (cb,errorCb) => {
    return axios({
        url: '/user',
        method: 'get',
        params: {
            user_id: '12'
        }
    },cb,errorCb);
}

export const get_menu_list = (user_id,cb,errorCb) => {
    return axios({
        url:'/menu',
        method: 'post',
        params:{
            user_id
        }
    },cb,errorCb);
}