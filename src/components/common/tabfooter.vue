<template>
  <tabbar class="lf-tabbar">
    <tabbar-item :selected="selectedPage.a" link="/">
      <div slot="icon" class="iconfont icon-tuijianyonghu"></div>
      <span slot="label">推荐客户</span>
    </tabbar-item>
    <tabbar-item :selected="selectedPage.b" link="/customer/list">
      <div slot="icon" class="iconfont icon-kehu"></div>
      <span slot="label">客户管理</span>
    </tabbar-item>
    <tabbar-item  :selected="selectedPage.c"  link="/merchant/list">
      <div slot="icon" class="iconfont icon-shanghu"></div>
      <span slot="label">核心商户</span>
    </tabbar-item>
    <tabbar-item :selected="selectedPage.e" link="/user/settings">
      <div slot="icon" class="iconfont icon-shezhi"></div>
      <span slot="label">设置</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

  export default {
    components: {
      Tabbar, TabbarItem
    },
    name: 'tabfooter',
    props: {
      which: String
    },
    data () {
      return {}
    },
    computed: {
      selectedPage () {
        return {
          a: this.which === 'a',
          b: this.which === 'b',
          c: this.which === 'c',
          d: this.which === 'd',
          e: this.which === 'e'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lf-tabbar {
    position: fixed;
    bottom: 0;
  }
  .weui-tabbar__item {
    padding: 0;
  }
</style>
