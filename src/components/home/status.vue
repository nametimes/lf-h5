<template>
  <div class="box">
    <x-button v-for="item in status" :key="item.key" class="status-box" @click.native="apply(item)">{{item.value}}</x-button>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    name: 'status',
    props: ['status'],
    components: {
      XButton
    },
    methods: {
      apply (item) {
        if (item.key === 0) {
          this.$router.push({path: "/customer/credit"})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @function er($v){
    @return $v /16 / 1 *1rem;
  }
  .box{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .status-box{
    width: 60%;
    height: er(100);
    margin: er(30) 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
