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