import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      meta: { requireAuth: true },
      component: reslove => {
        require(['@/components/survey/list'],reslove)
      }
    },
    {
      path: '/user/login',
      name: 'login',
      meta: { requireAuth: true },
      component: reslove => {
        require(['@/components/user/login'],reslove)
      }
    },
    {
      path: '/customer/credit',
      name: 'credit',
      meta: {requireAuth: true},
      component: resolve => {
        require(['@/components/customer/credit'],resolve)
      }
    }
  ]
})
