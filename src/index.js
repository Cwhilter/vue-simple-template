import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from 'axios'
import 'assets/lib/common.css'
//import iView from 'iview'
import 'iview/dist/styles/iview.css'


Vue.use(VueRouter)
//Vue.use(iView)
Vue.prototype.$http = axios

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

new Vue({
    router
}).$mount('#app')
