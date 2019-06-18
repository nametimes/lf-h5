// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import FastClick from 'fastclick'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import './assets/css.css'

import axios from 'axios'
import utils from './assets/js/utils' //身份证

import validate from './assets/js/validator'
import { AlertPlugin, ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'

import './assets/footerfonts/iconfont.css'
import './assets/js/password.js'

Vue.use(ElementUI)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

// router.beforeEach(function (to, from, next) {
//   window.scrollTo(0, 0)
//   store.commit('updateLoadingStatus', { isLoading: true })
//   if (localStorage.getItem('accessToken') === null) {
//     next({path: '/user/login'})
//   } else {
//     next()
//   }
//
// })

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  store.commit('updateLoadingStatus', { isLoading: true })
     next()



});
if (localStorage.getItem("accessToken") === null) {

}

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', { isLoading: false })
})


FastClick.attach(document.body)




const ajax = (data) => {
  data.headers = {
    'accessToken': localStorage.getItem('accessToken') || ''
  }
  data.timeout = 60000
  return axios(data).catch(error => {
    switch (error.response.status) {
      case 456:
        router.push('/user/login')
        break
      case 567:
        router.push('/user/login')
        break
      case 401:
        router.push('/user/login')
        break
      case 403:
        Vue.$vux.alert.show({
          content: '无权访问'
        })
        break
      case 404:
        Vue.$vux.alert.show({
          content: '您访问的接口不存在'
        })
        break
      case 405:
        Vue.$vux.alert.show({
          content: '访问出错405'
        })
        break
      case 500:
        Vue.$vux.alert.show({
          content: '访问出错500'
        })
        break
    }
  })
}

Vue.config.productionTip = false
Vue.prototype.axios = ajax
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
