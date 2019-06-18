<template>
    <div>
      <x-header :left-options="{backText: ''}" style="background-color: #b60e2f;">贷款补充说明</x-header>
      <div class="box">
        <div class="input-wrap vux-1px-b">
          <label for="name">姓名：</label>
          <input type="text" v-model="form.name" id="name" placeholder="输入姓名">
        </div>
        <div class="input-wrap vux-1px-b">
          <label for="idnumber">身份证号：</label>
          <input type="text" v-model="form.idnumber" id="idnumber" placeholder="请输入身份证">
        </div>
        <div class="input-wrap vux-1px-b">
          <label for="cellphone">手机号：</label>
          <input type="text" v-model="form.cellphone" id="cellphone" placeholder="请输入手机号">
        </div>
        <div class="input-wrap vux-1px-b">
          <label for="site">经营地址：</label>
          <input type="text" v-model="form.site" id="site" placeholder="请输入地址">
        </div>
      </div>
      <x-button type="primary" class="submit" @click.native="submit">提交</x-button>
      <!--<el-form ref="form" :model="form" label-width="80px">-->
        <!--<el-form-item label="姓名">-->
          <!--<el-input v-model="form.name"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="身份证号">-->
          <!--<el-input v-model="form.idnumber"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="手机号">-->
          <!--<el-input v-model="form.cellphone"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="经营地址">-->
          <!--<el-input v-model="form.site"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    </div>
</template>

<script>
  import { XHeader, XButton } from 'vux'
  export default {
    name: 'credit',
    components: {
      XHeader,
      XButton
    },
    data () {
      return {
        form: {
          name: '',
          idnumber: '',
          cellphone: '',
          site: ''
        }
      }
    },
    methods: {
      submit () {

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      display: inline-block;
      color: #7c7979;
      position: relative;
      top: er(3);
    }
    input {
      display: inline-block;
      width: 70%;
      height: er(30);
      /*background-color: transparent;*/
      border: none;
      /*-webkit-tap-highlight-color: transparent;*/
      outline: none;
      font-size: 14px;
      border-radius: 5px;
      padding-top: er(5);
      padding-left: er(10) ;
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
  label{
    color: #606266;
    font-size: 14px;
    width: er(80);
  }
  .submit{
    width: 70%;
    height: er(50);
    margin-top: er(50);
  }
  .box{
    margin-top: er(30);
  }
</style>
