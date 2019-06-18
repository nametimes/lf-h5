import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
import utils from './utils'

const isArray = (o) => {
  return Object.prototype.toString.call(o) === '[object Array]'
}
const toast = (msg) => {
  Vue.$vux.toast.show({
    text: msg,
    type: 'warn',
    width: '12em',
    position: 'top'
  })
}
const validate = (form, rules) => {
  let flag = true
  for (const prop in rules) {
    const singleRule = rules[prop]
    const value = form[prop]
    if (singleRule.required) {
      if (value === null || value === '' || value === undefined) {
        toast(singleRule.msg)
        return false
      }
      if (isArray(value) && value.length === 0) {
        toast(singleRule.msg)
        return false
      }
    }
    const typeMsg = singleRule.typeMsg
    switch (singleRule.type) {
      case 'mobile':
        if (!utils.isMobile(value)) {
          toast(typeMsg)
          return false
        }
        break
      case 'amount':
        if (!utils.isAmount(value)) {
          toast(typeMsg)
          return false
        }
        break
      case 'integer':
        if (!utils.isInteger(value)) {
          toast(typeMsg)
          return false
        }
        break
      case 'double':
        if (!utils.isDouble(value)) {
          toast(typeMsg)
          return false
        }
        break
      case 'rate':
        if (!utils.isRate(value) || !utils.isAmount(value)) {
          toast(typeMsg)
          return false
        }
        break
      case 'cardId':
        if (utils.checkIdcard(value) !== '1') {
          toast(typeMsg)
          return false
        }
        break
      default:
        flag = true
    }
  }
  return flag
}
export default validate
