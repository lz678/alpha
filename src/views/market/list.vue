<!-- market_list -->
<template>
  <div class="market_list">
    <van-pull-refresh class="list" v-model="isLoadRefresh" @refresh="refreshList">
      <van-list
        v-model="isLoading"
        :finished="isFinished"
        @load="pullList"
        :offset="100"
        finished-text="人家也是有底线的"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div>
            <div class="styletwo">{{item.mobile}}</div>
            <div class="styleone">{{item.deal_rate}}</div>
          </div>
          <div>
            <div class="styletwo">数量：{{item.num}}</div>
            <div class="styleone">单价：{{item.price}}</div>
          </div>
          <div>
            <div class="isup">{{item.btname}}</div>
          </div>
          <!-- <div class="avatar">
            <img :src="item.avatar" alt />
          </div>
          <div class="info">
            <div class="nickname van-ellipsis">{{item.nickname}}</div>
            <div class="id">ID：{{item.in_user_id}}</div>
            <div class="price">
              单价:
              <span>{{item.money}}</span>
              数量:
              <span>{{item.num}}</span>
            </div>
            <div class="num">最近30日成交量：{{item.num_trade}}</div>
          </div>
          <div class="opt">
            <div class="sell_btn" v-if="item.in_user_id!==userId" @click="handleSell(item)">卖给TA</div>
            <div class="sell_type">
              <div class="alipay" v-if="hasPay(item.payments,'alipay')">
                <img src="../../assets/images/alipay.png" alt />
              </div>
              <div class="wepay" v-if="hasPay(item.payments,'weixin')">
                <img src="../../assets/images/wepay.png" alt />
              </div>
            </div>
          </div> -->
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- <div class="publish" @click="isShowPub=true">发布</div> -->

    <sell-md :isShow.sync="isShowSell" :info="curInfo" @changeData="getMarketList" />
    <market-pub :isShow.sync="isShowPub" :total="total" @changeData="getMarketList" />
  </div>
</template>

<script>
import sellMd from "./modules/sell_md";
import marketPub from "./modules/pub_md";

import { getStore } from "@/utils/utils";
export default {
  name: "market_list",
  components: { sellMd, marketPub },
  props: {
    tab: Number,
    search: String,
    total: Object,
    coin_id: Number,
    side:Number
  },
  data() {
    return {
      page: 1,
      isLoadRefresh: false,
      isLoading: false,
      isFinished: false,
      // coin_id: 1,
      apiList: ["getMarketBuyList", "getServiceMarket"],

      list: [],
       
      userId: "",

      curInfo: {},
      isShowSell: false,

      isShowPub: false
    };
  },
  computed: {},
  methods: {
    refreshList() {
      this.page = 1;
      console.log("下拉刷新");
      this.isLoadRefresh = false;
      this.getMarketList();
    },
    pullList() {
      console.log("上拉加载");
      // console.log(this.coin_id);
      // console.log(this.side);
      this.page++;
      // this.getMarketList();
    },
    
    getMarketList() {
      console.log("获取列表");
      const page = this.page;
      if (page === 0) return false;
      this.$api
        .getMarketBuyList({ coin_id: this.coin_id, side: this.side,page:page })
        .then(data => {
          console.log(data,"列表");
          this.isLoadRefresh = false;
          this.isLoading = false;
          if (data.code === 1) {
            if (page === 1) {
              this.list = data.data.info;
            } else {
              this.list.push(...data.data.info)
              // this.list.concat(data.data.info);
            }

            if (data.data.total / 10 <= page) {
              this.isFinished = true
            } else {
              this.isFinished = false
            }
          } else {
            this.isLoadRefresh = false;
            this.isLoading = false;
            this.isFinished = true;
          }
        });
    },

    // hasPay(list, type) {
    //   return list.includes(type);
    // },

    // 卖出
    handleSell(info) {
      console.log(info, "llll");
      this.curInfo = info;
      this.isShowSell = true;
    }
  },

  created() {
    
    this.getMarketList();
    this.userId = getStore("userInfo").id;
  },
  mounted() {}
};
</script>

<style lang='scss'>
.market_list {
  // width: 100%;
  // height: 100%;
  // height: 50vh;
  padding-top: 1.2rem;
   
    .item {
      width: 100%;
      height: 50px;
      display: flex;
      background-color: #F4F4F4;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 4px;
      .styleone{
        color:#949EA5;
      }
      .styletwo{
        color: #193445;
        font-size: 1.5rem;
        // font-weight: 600;
      }
      .isup {
        width: 5rem;
        height: 25px;
        text-align: center;

        line-height: 25px;
        background-color: #03BE87;
        // border: 1px solid red;
      }
    }
  .avatar {
    width: 2.72rem;
    height: 2.72rem;
    border-radius: 100%;
    overflow: hidden;
  }

  .info {
    flex: 1;
    margin-left: 0.8rem;
    line-height: 1.6rem;
  }
  .nickname {
    max-width: 14rem;
    font-size: 1.2rem;
  }
  .id,
  .num {
    font-size: 0.96rem;
  }
  .price {
    color: #da2e63;
    span {
      margin-right: 0.8rem;
      font-weight: bold;
    }
  }

  .sell_btn {
    width: 5.6rem;
    height: 2.72rem;
    line-height: 2.72rem;
    text-align: center;
    background: #da2e63;
    border-radius: 0.4rem;
    font-size: 0.96rem;
  }
  .sell_type {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1.8rem;
    width: 5.6rem;
  }

  .alipay,
  .wepay {
    width: 1.6rem;
    height: 1.6rem;
  }
  .publish {
    position: fixed;
    left: 50%;
    margin-left: -2.96rem;
    bottom: 4rem;
    width: 5.92rem;
    height: 3.52rem;
    text-align: center;
    line-height: 4rem;
    font-size: 1.44rem;
    background: #da2e63;
    border-radius: 5.92rem 5.92rem 0 0;
  }
}
</style>