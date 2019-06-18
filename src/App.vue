<template>
  <div id="app">
    <router-view/>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  export default {
    data () {
      return{
      }
    },
    components: {
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },
    methods: {
    },
  }
</script>

<style scoped lang="scss">
  /*@import '~vux/src/styles/reset.less';*/
  @function er($v){
    @return $v /16 / 1 *1rem;
  }
  body {
    background-color: #fbf9fe;
  }
  .lf-btn {
    display: block;
    margin: 20px auto;
    width: 80% !important;
  }
  .btn-center {
    text-align: center;
    margin: 10px;
  }
  .bottom-wrap {
    width: 80%;
    text-align: center;
    margin: 20px auto;
  }
  .add-icon {
    color: #b60e2f;
  }
  .form-wrap {
    margin-bottom: 100px;
  }
  .preview-form {
    margin-top: -10px;
  }
  .more-btn {
    margin-top: 10px;
    text-align: center;
  }
  .weui-form-preview__label {
    width: 12em;
    text-align-last: auto !important;
  }
  .iconfont {
    font-size: 25px;
  }
</style>
