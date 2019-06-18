<template>
  <div>
    <div class="logo-wrap">
      &nbsp;<img class="logo" :src="logo" alt="">
    </div>
    <div class="input-wrap vux-1px-b">
      <i class="icon iconfont icon-phone"></i>
      <input type="tel" maxlength="11" v-model="phone" placeholder="请输入手机号">
    </div>
    <div class="input-wrap vux-1px-b">
      <i class="icon iconfont icon-password"></i>
      <input id="selpwd" type="text" class="password-input" v-model="code" placeholder="请输入验证码">
      <span class="forget-password" @click="resetPassword">获取验证码</span>
    </div>
    <x-button  @click.native="login" class="login-btn" type="primary">登录</x-button>
  </div>
</template>

<script>
  import { Group, XInput, XButton } from 'vux'
  import logo from '@/assets/logo.png'
  import qs from 'qs'
  export default {
    name: 'login',
    components: {
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        logo: logo,
        phone: '',
        skey: '',
        code: ''
      }
    },
    mounted () {
      this.phone = localStorage.getItem('phone')
      this.skey = sessionStorage.getItem('skey')
      if (this.skey === null || this.skey === '') {
        // this.getSecurityKey()
      }
    },
    methods: {
      login () {
        if (!this.phone) {
          this.$vux.toast.show({
            text: '请输入手机号',
            type: 'warn',
            width: '12em'
          })
          return
        }
        if (!this.utils.isMobile(this.phone)) {
          this.$vux.toast.show({
            text: '请输入正确的手机号',
            type: 'warn',
            width: '12em'
          })
          return
        }
        var password = passGuardManager.getOutput2('selpwd')
        const passwordText = document.getElementById('selpwd').value
        if (!passwordText) {
          this.$vux.toast.show({
            text: '验证码',
            type: 'warn',
            width: '12em'
          })
          return
        }
        this.$vux.loading.show({
          text: '正在登录'
        })
        this.axios({
          url: '/lf/client/login',
          method: 'post',
          data: qs.stringify({
            phone: this.phone,
            identifyingCode: 1111111
          })
        }).then(res => {
          this.$vux.loading.hide()
          if (res.data.errcode) {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
              width: '12em'
            })
            return
          }
          passGuardManager.StopPassGuardKeyBoard('selpwd')
          passGuardManager.clear('selpwd')
          const rtnData = res.data.data
          // localStorage.setItem('userId', rtnData.userId)
          localStorage.setItem('accessToken', rtnData)
          // localStorage.setItem('uid', rtnData.uid)
          // localStorage.setItem('name', rtnData.name || '')
          // localStorage.setItem('phone', this.phone)
          // localStorage.setItem('job', rtnData.roleName)
          this.$router.push('/')
        })
      },
      // 获取验证码
      resetPassword () {

      }
    }
  }
</script>

<style scoped lang="scss">
  @function er($v){
    @return $v /16 / 1 *1rem;
  }
  body {
    background-color: #fff;
  }
  .logo-wrap {
    position: relative;
    padding-top: er(20);
    text-align: center;
    .logo {
      width: er(300);
      height: er(144);
    }
  }
  .input-wrap {
    margin: er(10) auto;
    width: 85%;
    height: er(50);
    .icon {
      display: inline-block;
      color: #7c7979;
      position: relative;
      top: er(3);
    }
    input {
      display: inline-block;
      width: 90%;
      height: er(50);
      background-color: transparent;
      border: none;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      font-size: 16px;
      padding-top: er(5);
    }
    .password-input {
      width: 65%;
    }
  }
  .forget-password {
    font-size: 14px;
    color: #b60e2f;
  }
  .login-btn {
    width: 60%;
    margin: 0 auto;
    margin-top: er(40);
  }
  .btn-box{
    display: flex;
    justify-content: center;
    margin-top: er(30);
  }
  .zc{
    margin: 0 auto;
    width: 60%;
    height: er(40);
    border-radius: 5px;
    outline: 0;
    border: none;
    color: white;
    font-size: 18px;
    background: dodgerblue;
  }
</style>
