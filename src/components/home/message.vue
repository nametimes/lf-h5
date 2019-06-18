<template>
    <div>
      <div class="home-box">
        <p>{{ message1.phone}} 用户您好：</p>
        <div class="home-content">
          <div class="text">
            <p @click="login">状态：{{message1.statusNm || '请登录'}}</p>
            <p>授信额度：{{message1.creditLimit || 0}}</p>
          </div>
          <div class="text">
            <p>已用额度：{{message1.usedLimit || 0}}</p>
            <p>剩余额度：{{message1.usableLimit || 0}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'message',
    props: ['message1'],
    methods: {
      login() {
        if (!localStorage.getItem('tocken')) {
          this.$router.push({path: '/user/login'})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @function er($v){
  @return $v /16 / 1 *1rem;
  }
  .home-content{
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 0 er(40);
    p{
      margin-top: er(10);
    }
  }
  .home-box{
    margin-top: er(20);
  }

  .home-box>p{
    padding-left: er(18);
  }
</style>
