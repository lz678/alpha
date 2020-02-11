<!-- me_order -->
<template>
  <div class="me_order">
    <van-nav-bar fixed title="我的订单" left-arrow @click-left="$router.go(-1)" />

    <van-tabs v-model="curTab" sticky :offset-top="50" :ellipsis="false">
      <van-tab title="待匹配">
        <order-list :tab="0" />
      </van-tab>
      <van-tab title="交易中">
        <order-list :tab="1" />
      </van-tab>
      <van-tab title="已完成">
        <order-list :tab="2" />
      </van-tab>
      <van-tab title="已取消">
        <order-list :tab="3" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import orderList from './list'
export default {
  name: 'me_order',
  components: { orderList },
  data () {
    return {
      curTab: 0,
    }
  },
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.me_order {
  padding-top: 4rem;
}
</style>