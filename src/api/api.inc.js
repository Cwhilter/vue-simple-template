import axios from 'axios'

axios.defaults.baseURL = '';
axios.defaults.url = '';
axios.defaults.timeout = 30000;
axios.defaults.onUploadProgress = (progressEvent) => {
    // 对原生进度事件的处理
};

// `onDownloadProgress` 允许为下载处理进度事件
axios.defaults.onDownloadProgress = (progressEvent) => {
    // 对原生进度事件的处理
};

export default (config,cb,errorCb) => {
    axios(config).then((response) => {
        if(response.data.success){
            cb(response.data);
        }else{
            errorCb(response);
        }
    }).catch((error) => {
        if (axios.isCancel(error)) {
            errorCb({ code: 'E-FW-API-001' });
        } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            errorCb({ code: 'E-FW-API-002' });
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errorCb({ code: 'E-FW-API-003' });
        } else {
            // Something happened in setting up the request that triggered an Error
            errorCb({ code: 'E-FW-API-004' });
        }
    })
}
