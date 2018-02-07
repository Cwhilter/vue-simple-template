import 'babel-polyfill';
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routes'
import store from './store/index'
import axios from './api/api.inc'
import 'assets/lib/common.less'
import iView from 'iview'
import i18n from './langs/index';


Vue.use(VueRouter)
Vue.use(iView);

Vue.config.errorHandler = function(err, vm, info){
    console.log(err);
}

Vue.prototype.$http = axios

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

new Vue({
    router,
    store,
    i18n,
    mounted () {
        
    },
    created () {
    }
}).$mount('#app')

