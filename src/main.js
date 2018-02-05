import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store/'
import axios from './api/api.inc'
import 'assets/lib/common.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'


Vue.use(VueRouter)
Vue.use(iView)

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
    store
}).$mount('#app')
