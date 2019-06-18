const utils = {
  isArray: (o) => {
    return Object.prototype.toString.call(o) === '[object Array]'
  },
  /**
   * 根据用户传的关键字去地址栏里的查询字符串进行对比,该关键字对应的值
   */
  getParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) return unescape(r[2])
    return null
  },
  isInteger (s) {
    return /^\d+$/.test(s)
  },
  isDouble: function (value) {
    return /^\d+(\.\d+)?$/.test(value)
  },
  // 小数点后最多两位
  isAmount (value) {
    return /^([1-9]\d*|0)(\.\d{1,2})?$/.test(value)
  },
  isMobile (mobile) {
    return /^1[3|4|5|7|8]\d{9}$/.test(mobile)
  },
  isEmail (email) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
  },
  isRate (param) {
    return param !== null && param !== '' && ((+param >= 0) && (+param <= 100))
  },
  checkIdcard (idcard, showMsg) {
    // var idcard=this.trim(idcard1);// 对身份证号码做处理。去除头尾空格。
    idcard = idcard.toUpperCase()
    var Errors = [
      '验证通过!',
      '身份证号码位数不对!',
      '身份证号码出生日期超出范围或含有非法字符!',
      '身份证号码校验错误!',
      '身份证地区非法!'
    ]
    var area = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }

    var reback = '1' // 返回的标示，1代码通过
    var Y
    var M
    var JYM
    var S
    var ereg
    var idcardArray = []
    idcardArray = idcard.split('')
    /* 基本校验*/
    if (idcard === '' || idcard === null || idcard.length === 0) {
      if (showMsg === null || showMsg === '') {
        reback = '请输入您的身份证号'
      }
      return reback
    }
    /* 地区检验*/
    if (area[parseInt(idcard.substr(0, 2))] == null) {
      if (showMsg == null || showMsg === '') {
        reback = Errors[4]
      }
      return reback
    }
    /* 身份号码位数及格式检验*/
    switch (idcard.length) {
      case 15:
        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
        } else {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
        }
        if (ereg.test(idcard)) {
          return reback
        } else {
          if (showMsg == null || showMsg === '') {
            reback = Errors[2]
          }
          return reback
        }
      case 18:
        // 18位身份号码检测
        // 出生日期的合法性检查
        // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
        // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
        if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
        } else {
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
        }
        if (ereg.test(idcard)) { // 测试出生日期的合法性
          // 计算校验位
          S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 + (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 + (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 + (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 + (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1 + parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3
          Y = S % 11
          M = 'F'
          JYM = '10X98765432'
          M = JYM.substr(Y, 1) /* 判断校验位*/
          if (M === idcardArray[17]) {
            return reback
          } else {
            if (showMsg == null || showMsg === '') {
              reback = Errors[3]
            }
            return reback
          }
        } else {
          if (showMsg == null || showMsg === '') {
            reback = Errors[2]
          }
          return reback
        }
      default:
        if (showMsg == null || showMsg === '') {
          reback = Errors[1]
        }
        return reback
    }
  }
}

export default utils
