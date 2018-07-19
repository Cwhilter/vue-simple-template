import {routes,appRouter} from './routes'
import VueRouter from 'vue-router'
import Vue from 'vue';
import iView from 'iview';

Vue.use(VueRouter);
const router = new VueRouter({
    routes: routes,
    mode: 'history',
    beforeEnter: (to, from, next) => {
        
    }
})
const getMenuByChildren = function(menu_children,menu_list){
    let menu_array = menu_children.map(item => {
        if(typeof item.id !== 'undefined'){
            if(menu_list.indexOf(item.id) > -1){
                if(typeof item.children !== 'undefined'){
                    item.children = getMenuByChildren(item.children,menu_list);
                    item.children = item.children.filter(list => {
                        return list;
                    })
                }else{
                    item.children = [];
                }
                delete item['component'];
                return item;                
            }
            return null;
        }
        delete item['component'];    
        return item;
    })
    return menu_array.filter(item => {
        return item;
    })
}
const isExist = function(route_name,router){
    for (let index = 0; index < router.length; index++) {
        const element = router[index];
        if(element.name === route_name) return true;
        if(element.hasOwnProperty('children') && element.children.length > 0){
            if(isExist(route_name, element.children)) return true;
        }
    }
    return false;            
}
router.beforeEach((to, from ,next) => {
    next();
    return;
    iView.LoadingBar.start();
    if(to.name !== 'login' && typeof sessionStorage.api_token === 'undefined'){
        sessionStorage.clear();        
        next({name: 'login'});
    }else{
        if(to.name == '404' || to.name == '403' || to.name == 'login'){
            next();
        }else{
            let user_menu = JSON.parse(sessionStorage.getItem('user_menu'));
            let menu_children = JSON.parse(JSON.stringify(appRouter.children));
            let user_router_menu = getMenuByChildren(menu_children,user_menu);
            // let exist = isExist(to.name,user_router_menu);
            let exist = true;
            if(!exist){
                next({name: '403'});
            }else{
                next();
            }
        }
    }
})

router.afterEach(to => {
    iView.LoadingBar.finish();      
})

export default router;
