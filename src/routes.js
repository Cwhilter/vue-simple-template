import App from './App.vue'
//const studentMain = r => require.ensure([], () => r(require('./layouts/studentMain.vue')), 'studentMain')
const noFound = r => require.ensure([], () => r(require('./pages/404.vue')), '404')
const example = r => require.ensure([], () => r(require('./pages/about.vue')), 'example')


export default [
    {
        path: '',
        component: noFound
    },
    {
        path: '/example',
        component: noFound
    },
    // {
    //     path: '/teacher',
    //     component: teacherMain,
    //     children: [
    //         {
    //             path: '',
    //             redirect: 'index'
    //         },
    //         {
    //             path: 'index',
    //             component: teacher
    //         },
    //         {
    //             path: 'arrage',
    //             component: arrage
    //         },
    //         {
    //             path: 'statistics',
    //             component: statistics
    //         },
    //         {
    //             path: 'studentInfo',
    //             component: studentInfo
    //         }
    //     ]
    // },
    {
        path: '*',
        component: noFound
    }
]