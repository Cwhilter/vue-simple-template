import 'babel-polyfill';
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'
import {nativeAxios,httpRequest} from './api/api.inc'
import 'src/theme/theme.default.less'
// import 'src/theme/theme.dark.less'
import iView from 'iview'
import i18n from './langs/index';
import VueI18n from 'vue-i18n';
import echart from 'echarts';
import {judgeType,EventUtil} from './assets/lib/util'
import validator from './assets/lib/validator'
Vue.use(VueRouter)
Vue.use(iView);
Vue.use(VueI18n);
Vue.config.errorHandler = function(err, vm, info){
    console.log(err);
}

Vue.prototype.$http = httpRequest;
Vue.prototype.$axios = nativeAxios;
Vue.prototype.$echart = echart;
Vue.prototype.$validator = validator;

new Vue({
    router,
    store,
    i18n,
    mounted () {
    },  
    methods: {
        
    },
    watch: {
        '$route'(to, from){
            window.document.title = this.$t('nav.navName.' + to.name.split('/').shift())
            if(to.name == '404' || to.name == '403' || to.name == 'login') return;            
            let nav_name = to.name.split('/').shift();
            let not_exist = this.$store.state.pageOpenedList.every((list,index) => {
                return list.name !== nav_name; 
            })
            if(not_exist){
                let nav_item = {
                    name: nav_name,
                    params: to.params
                }
                this.$store.commit('ADD_TAB', nav_item);
            }   
        },
        '$store.state.pageOpenedList': function(){
            sessionStorage.setItem('pageOpenedList',JSON.stringify(this.$store.state.pageOpenedList));        
        }
    },
    created () {
        if(judgeType.isDefined(sessionStorage.pageOpenedList)){
            this.$store.commit('INIT_TAB',JSON.parse(sessionStorage.pageOpenedList));
        }
        if(judgeType.isDefined(sessionStorage.user_menu)){
            this.$store.commit('SET_MENU',JSON.parse(sessionStorage.user_menu));
        }
        this.$Notice.config({
            top: 90,
            right: 10
        });
        (function(doc, win, vue) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function() {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    // docEl.style.fontSize = clientWidth * (100 / 1920) + 'px';
                    if(clientWidth > 1600){
                        docEl.style.fontSize = 100 + 'px';
                        vue.$store.commit('setRemSize',100);
                    }else if(clientWidth > 1200){
                        vue.$store.commit('setRemSize',80);                        
                        docEl.style.fontSize = 80 + 'px';                        
                    }else{
                        vue.$store.commit('setRemSize',clientWidth * (100 / 1920));                                                
                        docEl.style.fontSize = clientWidth * (100 / 1920) + 'px';                    
                    }
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window, this);
    },
    beforeDestroy(){
        sessionStorage.clear();
    }
}).$mount('#app')

