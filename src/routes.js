import App from './App.vue'
const teacherMain = r => require.ensure([], () => r(require('./layouts/teacherMain.vue')), 'teacherMain')
const adminMain = r => require.ensure([], () => r(require('./layouts/adminMain.vue')), 'adminMain')
const studentMain = r => require.ensure([], () => r(require('./layouts/studentMain.vue')), 'studentMain')

const teacher = r => require.ensure([], () => r(require('./pages/teacher.vue')), 'teacher')
const login = r => require.ensure([], () => r(require('./pages/login.vue')), 'login')
//const homeworkDetail = r=> require.ensure([],()=>r(require('./pages/homeworkDetail.vue')),'homeworkDetail')
//const studentInfo = r=> require.ensure([],()=>r(require('./pages/studentInfo.vue')),'studentInfo')
const arrage = r => require.ensure([], () => r(require('./pages/arrage.vue')), 'arrage')
const statistics = r => require.ensure([], () => r(require('./pages/statistics.vue')), 'statistics')
//const student = r=> require.ensure([],()=>r(require('./pages/student.vue')),'student')
// const commit = r=> require.ensure([],()=>r(require('./pages/commit.vue')),'commit')
// const homeworkList = r=> require.ensure([],()=>r(require('./pages/homeworkList.vue')),'homeworkList')
// const count = r=> require.ensure([],()=>r(require('./pages/count.vue')),'count')
// const admin = r=> require.ensure([],()=>r(require('./pages/admin.vue')),'admin')
// const teacherInfo = r=> require.ensure([],()=>r(require('./pages/teacherInfo.vue')),'teacherInfo')
// const homeworkInfo = r=> require.ensure([],()=>r(require('./pages/homeworkInfo.vue')),'homeworkInfo')
// const classInfo = r=> require.ensure([],()=>r(require('./pages/classInfo.vue')),'classInfo')
// const addTeacherInfo = r=> require.ensure([],()=>r(require('./pages/addTeacherInfo.vue')),'addTeacherInfo')

export default [
  {
    path: '',
    component: login
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/teacher',
    component: teacherMain,
    children: [
      {
        path: 'index',
        component: teacher
      },
      {
        path: 'arrage',
        component: arrage
      },
      {
        path: 'statistics',
        component: statistics
      }
    ]
  },
  ]