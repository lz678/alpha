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
      <div class="bgc"></div>
      <div class="type-name">{{typename}}走势图</div>
      <div id="myChart" :style="{width: '320px', height: '250px'}"></div>
      <div class="bgc"></div>
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
      <div class="first" @click="role">
        <div class="top" :class="{typeone:select==1}">买方</div>
        <div class="top" :class="{typeone:select==2}">卖方</div>
      </div>
      <div class="list_wrap">
        <market-list ref="list" :search="search" :coin_id="a" :side="b" :total="total" />
      </div>
    </div>

    <market-tip :isShow.sync="isTip"></market-tip>
  </div>
</template>

<script>
import echarts from "echarts";
import marketList from "./list";
import marketTip from "./modules/tip";
export default {
  name: "market",
  components: { marketList, marketTip },
  // components: { marketTip },
  data() {
    return {
      charts: "",
      opinion: [],
      opinionData: [],
      price: [1, 5, 2, 7],
      curType: 1,
      type: 0,
      select: 1,
      typename: "",
      coin_id: 1,
      side: 1,
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
  computed: {
    a() {
      return this.coin_id;
    },
    b() {
      return this.side;
    }
  },
  methods: {
    role(e) {
      console.log(e);

      console.log(e.target.innerText);
      if (e.target.innerText == "买方") {
        this.select = 1;
        this.side = 2;
        this.getmap();
        this.handleSearch();
        // console.log(this.coin_id);
        // console.log(this.side);
        return;
      }
      if (e.target.innerText == "卖方") {
        this.select = 2;
        this.side = 1;
        this.getmap();
        this.handleSearch();
        // console.log(this.coin_id);
        // console.log(this.side);
        return;
      }
    },
    drawLine() {
      this.charts = echarts.init(document.getElementById("myChart"));
      this.charts.setOption({
        grid: {
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.opinion,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 45,
            textStyle: {
              color: "#333"
            }
          }
        },
        yAxis: {
          name: "单位(元)",
          type: "category",
          boundaryGap: false,
          data: this.opinionData
        },

        series: [
          {
            name: this.typename,
            type: "line",
            stack: "总量",
            data: this.price
          }
        ]
      });
    },
    getmap() {
      this.$api
        .getmap({ coin_id: this.coin_id, side: this.side })
        .then(data => {
          console.log(data, "走势图");
          if (data.code == 1) {
            this.opinion = data.data.info_x;
            this.opinionData = data.data.info_y;
            this.drawLine();
          }
        });
    },
    gettype() {
      console.log(11111);

      this.$api.gettype().then(data => {
        console.log(data, "获取币种");
        if (data.code == 1) {
          this.typename = data.data.info[0].coin_name;
          this.coin_id = data.data.info[0].coin_id;
          this.typelist = data.data.info;
        }
      });
    },
    changetype(a, b) {
      // console.log(a,b);
      this.type = b;
      // this.side = b;
      this.typename = a.coin_name;
      this.coin_id = a.coin_id;
      console.log(this.typename, this.coin_id);
      this.getmap();
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

    // handleChangeSort(type) {
    //   let sort = this[type] === 1 ? 2 : 1;
    //   this[type] = sort;
    // },

    handleSearch() {
      console.log(this.$refs.list.coin_id);
      console.log(this.$refs.list.side);
      // this.$refs.list.coin_id
      //  this.$refs.list.side
      this.$refs.list.getMarketList();
    }
  },

  created() {
    this.gettype();
    // this.isTip = true;
    this.getmap();
    // this.drawLine();
  },
  mounted() {
    // this.getMarketTotal();
    // this.gettype();
    // this.getmap()
    this.drawLine();
  }
};
</script>

<style lang='scss'>
.first {
  margin-top: 6px;
  // width: 100%;
  display: flex;
  justify-content: space-around;

  .top {
    width: 30%;
    height: 2.5rem;
    text-align: center;
    border-radius: 4px;
    line-height: 2.5rem;
    // align-items: center;
    border: 1px solid #bebebe;
  }
  .typeone {
    color: #4470ff;
    border: 1px solid #4470ff;
  }
}
.type-name {
  color: black;
  font-size: 14px;
  padding-top: 10px;
  font-weight: 600;
}
.bgc {
  width: 100%;
  height: 1vh;
  background-color: #f4f4f4;
}
#myChart {
  margin: 0 auto;
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
      border:1px solid red;
      width: 100%;
      height: 46vh;
      margin-bottom: 52px;
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