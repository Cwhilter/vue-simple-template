//import App from '../App.vue'

export const login = {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'pages/login.vue')
}

export const page404 = {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */'pages/404.vue')
}
export const page403 = {
    path: '/forbidden',
    name: '403',
    component: () => import(/* webpackChunkName: "403" */'pages/403.vue')
}
export const otherRouter = {
    path: '/other',
    name: 'other',
    // component: () => import('pages/example.vue')
}
export const appRouter = {
    path: '/',
    redirect: '/index',
    component: () => import(/* webpackChunkName: "mainLayout" */'layouts/mainLayout.vue'),
    children:[
        {
            id: 1,
            path:'index',
            name: 'index',
            icon: 'home',
            component: () => import(/* webpackChunkName: "home" */'pages/example.vue')
        },
        {
            id: 2,
            path:'example',
            name: 'example',
            icon: 'home',
            component: () => import(/* webpackChunkName: "home" */'pages/example.vue')
        }
    ]
}
export const routes =  [
    login,
    page404,
    page403,
    appRouter,
    otherRouter
]