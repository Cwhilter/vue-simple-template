import axios from 'axios'

axios.defaults.baseURL = 'http://localhost';
axios.defaults.url = '';
axios.defaults.timeout = 30000;
axios.defaults.onUploadProgress = (progressEvent) => {
    // 对原生进度事件的处理
};
// `onDownloadProgress` 允许为下载处理进度事件
axios.defaults.onDownloadProgress = (progressEvent) => {
    // 对原生进度事件的处理
};
axios.validateStatus = (status) => {
    return status >= 200 && status < 300; // 默认的
};
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if(typeof sessionStorage.api_token !== 'undefined'){
        config.headers['x-api-key'] = sessionStorage.getItem('api_token')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if(response.headers.hasOwnProperty('x-api-key')){
        sessionStorage.setItem('api_token',response.headers['x-api-key']);            
    }
    return response;    
  }, function (error) {
    if(error.response && error.response.status == 401){
        sessionStorage.clear();
        window.location.href = '/login';
    }
    return Promise.reject(error);
  });
export const httpRequest = (config,cb,errorCb) => {
    axios(config).then((response) => {
        if(cb) cb(response);
    }).catch((error) => {
        if(errorCb) errorCb(error);
        
    });
}    
export const nativeAxios = axios; 
