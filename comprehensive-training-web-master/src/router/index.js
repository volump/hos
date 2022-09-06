import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404/404.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout/layout.vue'),
    // component: layout,
    // redirect:"/index",
    // 子路由/嵌套路由
    children: [
      // {
      //   path:"/index",
      //   name:"index",
      //   component:()=>import("../views/pages/index.vue")
      // },
      {
        path: '/echartview',
        name: 'echartview',
        component: () => import('../views/pages/echartview.vue')
      },
      {
        path: '/department-detail',
        name: 'department-detail',
        component: () => import('../views/pages/department-detail.vue')
      },
      {
        path: '/department-schedule',
        name: 'department-schedule',
        component: () => import('../views/pages/department-schedule.vue')
      },
      {
        path: '/doctor-detail',
        name: 'doctor-detail',
        component: () => import('../views/pages/doctor-detail.vue')
      },
      {
        path: '/hospital-detail',
        name: 'hospital-detail',
        component: () => import('../views/pages/hospital-detail.vue')
      },
      {
        path: '/schedule-detail',
        name: 'schedule-detail',
        component: () => import('../views/pages/schedule-detail.vue')
      },
      {
        path: '/hospital',
        name: 'hospital',
        component: () => import('../views/pages/hospital.vue')
      },
      {
        path: '/department',
        name: 'department',
        component: () => import('../views/pages/department.vue')
      },
      {
        path: '/room',
        name: 'room',
        component: () => import('../views/pages/room.vue')
      },
      {
        path: '/department',
        name: 'department',
        component: () => import('../views/pages/department.vue')
      },
      {
        path: '/departmentAddRoom',
        name: 'departmentAddRoom',
        component: () => import('../views/pages/departmentAddRoom.vue')
      }
    ]
  },
  {
    path: '/layout-doctor',
    name: 'layout-doctor',
    component: () => import('../views/layout/layout-doctor.vue'),
    // component: layout,
    // redirect:"/index",
    // 子路由/嵌套路由
    children: [
      // {
      //   path:"/index",
      //   name:"index",
      //   component:()=>import("../views/pages/index.vue")
      // },
      {
        path: '/appointment-detail',
        name: 'appointment-detail',
        component: () => import('../views/pages-doctor/appointment-detail.vue')
      },
      {
        path: '/attendance-detail',
        name: 'attendance-detail',
        component: () => import('../views/pages-doctor/attendance-detail.vue')
      },
      {
        path: '/firstpage',
        name: 'firstpage',
        component: () => import('../views/pages-doctor/firstpage.vue')
      },
      {
        path: '/patientMedicalRecord',
        name: 'patientMedicalRecord',
        component: () =>
          import('../views/pages-doctor/patientMedicalRecord.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  // 1.如果访问的是登录页面（无需权限），直接放行
  if (to.path === '/') next()
  // 2.如果访问的是有登录权限的页面，先要获取token
  const tokenStr = window.sessionStorage.getItem('token1')
  //3.如果用户退出后token清空那么不再提示
  if (to.path === '/' && !tokenStr) {
    next('/')
  }
  // 3.2如果token为空，强制跳转到登录页面；否则，直接放行
  if (!tokenStr && to.path !== '/') {
    alert('请登录')
    next('/')
  } else next()
})
export default router
