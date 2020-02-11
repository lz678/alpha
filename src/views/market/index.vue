<!-- market -->
<template>
  <div class="market">
    <van-nav-bar fixed title="交易中心" right-text="发布订单" @click-right="isTip=true" />
    <!-- <div class="title">交易中心</div> -->
    <div class="main">
      <div class="type">
        <div
          v-for="(item,index) in typelist"
          :class="{typeclass:index==type}"
          :key="index"
          @click="changetype(item,index)"
        >{{item.coin_name}}</div>
      </div>
      <div class="type-name">{{typename}}走势图</div>
      <div id="myChart"></div>
      <!-- <div class="market_type">
        <div class="type_item" :class="{'active':curType===1}" @click="curType =1">普通求购</div>
        <div class="type_item" :class="{'active':curType===2}" @click="curType =2">服务商求购</div>
      </div>-->

      <!-- <div class="total">
        <div class="total_item">
          <div class="total_label">均价（昨/今）</div>
          <div class="total_value">$1.81/$1.80</div>
        </div>
        <div class="total_item">
          <div class="total_label">最高（昨/今）</div>
          <div class="total_value">$1.81/$1.80</div>
        </div>
        <div class="total_item">
          <div class="total_label">当前</div>
          <div class="total_value">$1.2</div>
        </div>
      </div>

      <div class="total">
        <div class="total_item">
          <div class="total_label">成交（昨/今）</div>
          <div class="total_value">$1.81/$1.80</div>
        </div>
        <div class="total_item">
          <div class="total_label">买量）</div>
          <div class="total_value">5035828</div>
        </div>
        <div class="total_item">
          <div class="total_label">涨跌</div>
          <div class="total_value">+1.7%</div>
        </div>
      </div>-->

      <!-- <div class="total">
        <div class="total_item">
          <div class="total_label">今日价格</div>
          <div class="total_value">{{total.today_trade_price}}</div>
        </div>
        <div class="total_item">
          <div class="total_label">今日成交量</div>
          <div class="total_value">{{total.today_trade_num}}</div>
        </div>
        <div class="total_item">
          <div class="total_label">求购总量</div>
          <div class="total_value">{{total.buy_count}}</div>
        </div>
      </div>-->

      <!-- <div class="sort">
        <div class="sort_item" @click="handleChangeSort('curSortTime')">
          <div class="sort_name">时间</div>
          <div class="sort_opt" :class="{'time_top':curSortTime === 2}"></div>
        </div>
        <div class="sort_item" @click="handleChangeSort('curSortPrice')">
          <div class="sort_name">单价</div>
          <div class="sort_opt" :class="{'price_top':curSortPrice === 2}"></div>
        </div>
        <div class="sort_item" @click="handleChangeSort('curSortNum')">
          <div class="sort_name">数量</div>
          <div class="sort_opt" :class="{'num_top':curSortNum === 2}"></div>
        </div>
        <div class="sort_item" @click="handleChangeSort('curSortClinch')">
          <div class="sort_name">30日成交</div>
          <div class="sort_opt" :class="{'clinch_top':curSortClinch === 2}"></div>
        </div>
      </div>-->
      <!-- 
      <div class="search">
        <form :action="handleSearch">
          <van-search
            v-model="search"
            placeholder="请输入ID搜索/溢价订单请输入完整手机号"
            left-icon
            right-icon="search"
            @search="handleSearch"
          >
            <span slot="left-icon"></span>
            <van-icon slot="right-icon" name="search" size="22px" @click="handleSearch" />
          </van-search>
        </form>
      </div>-->

      <div class="list_wrap">
        <market-list ref="list" :search="search" :coin_id="this.coin_id" :total="total" />
      </div>
    </div>

    <market-tip :isShow.sync="isTip"></market-tip>
  </div>
</template>

<script>
// var echarts = require('echarts');
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
// 以下的组件按需引入
require("echarts/lib/component/tooltip"); // tooltip组件
require("echarts/lib/component/title"); //  title组件
require("echarts/lib/component/legend"); // legend组件
import marketList from "./list";

import marketTip from "./modules/tip";
export default {
  name: "market",
  components: { marketList, marketTip },
  data() {
    return {
      curType: 1,
      type: 0,
      typename: '',
      coin_id:Number,
      curSortTime: 1,
      curSortPrice: 1,
      curSortNum: 1,
      curSortClinch: 1,
      typelist: [],
      total: {},
      rang: {},
      search: "",
      isTip: false
    };
  },
  computed: {},
  methods: {
    gettype() {
      console.log(11111);

      this.$api.gettype().then(data => {
        console.log(data, "获取币种");
        if (data.code == 1) {
          this.typename=data.data.info[0].coin_name
          this.coin_id=data.data.info[0].coin_id
          this.typelist = data.data.info;
           
        }
      });
    },
    changetype(a, b) {
      // console.log(a,b);
      this.type = b;
      this.typename = a.coin_name;
      this.coin_id=a.coin_id
      console.log(this.typename,this.coin_id);
      
    },
    // getMarketTotal() {
    //   this.$api.getMarketTotal().then(data => {
    //     if (data.code === 1) {
    //       this.total = data.data.header_info;
    //       this.rang = data.data.trade;
    //     } else {
    //       this.$toast(data.msg);
    //     }
    //   });
    // },

    handleRule() {},

    handleChangeSort(type) {
      let sort = this[type] === 1 ? 2 : 1;
      this[type] = sort;
    },

    handleSearch() {
      this.$refs.list.getMarketList();
    }
  },
  created() {
    // this.isTip = true;
  },
  mounted() {
    // this.getMarketTotal();
    this.gettype();
  }
};
</script>

<style lang='scss'>
.type-name {
  color: black;
  font-size: 14px;
  padding-top: 10px;
  font-weight: 600;
}
.typeclass {
  color: #567dff;
  border-bottom: 2px solid #567dff;
}
.type {
  width: 100%;
  height: 3rem;
  margin-top: 46px;
  border-bottom: 1px solid #efefef;
  // border: 1px solid #efefef;
  line-height: 3rem;
  display: flex;
  justify-content: space-around;
  color: black;

  // font-size: 12px;
}
.title {
  width: 100%;
  height: 3rem;
  font-weight: 600;
  border-bottom: 1px solid #efefef;
  line-height: 3rem;
  text-align: center;
  color: black;
  background-color: #fff;
}
.market {
  // padding-top: 4rem;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .main {
    // padding: 1.6rem;
    .list_wrap {
      width: 100%;
      height: 200px;
    }
  }
  .market_type {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2.56rem;
    line-height: 2.56rem;
    text-align: center;
    border-radius: 2.56rem;
    border: 1px solid rgba(52, 34, 47, 1);
    font-size: 1.44rem;
  }
  .type_item {
    width: 100%;
    border-radius: 2.56rem;
  }
  .type_item.active {
    background: #34222f;
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // margin-top: 1.2rem;
    padding: 1.2rem;
    background: #34222f;
    border-radius: 0.4rem;
  }
  .total_item {
    font-size: 0.96rem;
  }

  .total_value {
    margin-top: 0.8rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.6rem;
  }
  .sort_item {
    display: flex;
    align-items: center;
  }
  .sort_name {
  }
  .sort_opt {
    position: relative;
    top: -0.32rem;
    margin-left: 0.64rem;
    margin-right: 0.8rem;
  }

  .sort_opt::before {
    content: "";
    position: absolute;
    top: 0.4rem;
    left: 0;
    border-width: 0.32rem 0.24rem;
    border-color: transparent;
    border-style: solid;
    border-top-color: #fff;
  }
  .sort_opt::after {
    content: "";
    position: absolute;
    top: -0.4rem;
    left: 0;
    border-width: 0.32rem 0.24rem;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #da2e63;
  }

  .time_top::before {
    border-top-color: #da2e63;
  }
  .time_top::after {
    border-bottom-color: #fff;
  }
  .price_top::before {
    border-top-color: #da2e63;
  }
  .price_top::after {
    border-bottom-color: #fff;
  }
  .num_top::before {
    border-top-color: #da2e63;
  }
  .num_top::after {
    border-bottom-color: #fff;
  }
  .clinch_top::before {
    border-top-color: #da2e63;
  }
  .clinch_top::after {
    border-bottom-color: #fff;
  }

  .search {
    margin-top: 1.2rem;
  }

  .van-search,
  .van-search__content {
    padding: 0;
    background: transparent !important;
  }
  .van-cell {
    padding-right: 1.2rem;
    border-radius: 34px;
    background: transparent;
    border: 1px solid #da2e63;
  }
  .van-field__control::-webkit-input-placeholder {
    color: #da2e63;
  }
  .van-field__control {
    padding: 0 1.2rem;
    color: #da2e63;
  }
  .van-icon-search {
    color: #da2e63;
  }
}
</style>