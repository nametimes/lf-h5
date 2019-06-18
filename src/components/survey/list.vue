<template>
  <div>
    <x-header :left-options="{backText: '', showBack: false}" style="background-color: #b60e2f;">
      推荐客户
      <!--<i @click="create" class="iconfont icon-tianjiakehu" slot="right"></i>-->
    </x-header>
    <!--<div class="home-box">-->
      <!--<p>{{ message.phone}} 用户您好：</p>-->
      <!--<div class="home-content">-->
        <!--<div class="text">-->
          <!--<p @click="login">状态：{{message.statusNm || '请登录'}}</p>-->
          <!--<p>授信额度：{{message.creditLimit || 0}}</p>-->
        <!--</div>-->
        <!--<div class="text">-->
          <!--<p>已用额度：{{message.usedLimit || 0}}</p>-->
          <!--<p>剩余额度：{{message.usableLimit || 0}}</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <message :message1="message"/>
    <status :status="optionList"/>
    <!--<search-->
      <!--placeholder="姓名或手机号"-->
      <!--v-model="queryString"-->
      <!--@on-submit="queryFromSearch"-->
      <!--auto-scroll-to-top-->
      <!--ref="search"></search>-->
    <!--<group class="status">-->
      <!--<selector title="状态:" :options="optionList" v-model="status" @on-change="onChange"></selector>-->
    <!--</group>-->
    <!--<div v-if="resultList.length" class="form-wrap">-->
      <!--<group-->
        <!--class="preview-form"-->
        <!--v-for="(item, index) in resultList"-->
        <!--:key="index"-->
        <!--@click.native="toDetail(item)"-->
      <!--&gt;-->
        <!--<cell :title="item.name" value=""></cell>-->
        <!--<cell-form-preview :list="item.list"></cell-form-preview>-->
      <!--</group>-->
      <!--<div v-show="total > resultList.length" class="more-btn">-->
        <!--<x-button @click.native="loadMore" mini type="primary">点击加载更多</x-button>-->
      <!--</div>-->
    <!--</div>-->
    <!--<divider v-else>暂未查到符合条件的推荐客户</divider>-->
    <!--<tabfooter which="a"></tabfooter>-->
  </div>
</template>

<script>
  import {XHeader, XInput, Group, Cell, Selector, CellFormPreview, XButton, Divider } from 'vux'
  import tabfooter from '../common/tabfooter'
  import status from  '../home/status'
  import message from  '../home/message'
  import qs from 'qs'
  export default {
    name: 'list',
    components: {
      XHeader,
      XInput,
      Group,
      Cell,
      Selector,
      CellFormPreview,
      XButton,
      tabfooter, Divider,
      status,message
    },
    data () {
      return {
        queryString: '',
        optionList: [
          { key: 0, value: '申请授信' },
          { key: 1, value: '发起用款' },
          { key: 2, value: '我的贷款' },

        ],
        message: '',
        status: 4,
        total: 0,
        page: 1,
        rows: 20,
        resultList: []
      }
    },
    mounted () {
      // this.axios({
      //   url: '/lf/client/home',
      //   methods: 'post'
      // }).then(res => {
      //   console.log(res)
      // })
    },
    method: {
      login () {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @function er($v){
    @return $v /16 / 1 *1rem;
  }
  .red {
    background-color: #b60e2f;
    color: #fff;
  }
  .status {
    margin-top: er(-10);
  }
  .lf-list-item {
    margin: er(10) 0;
  }
  .weui-form-preview__value {
    font-size:  24px !important;
  }


</style>
