<!-- mall -->
<template>
  <div class="mall">
    <div class="nav">首页</div>
    <div>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swipelist" :key="index">
          <img class="my-swipe" :src="item" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-notice-bar text="通知内容egend字段,是为了配置下图的表现的;注意data字段的数组需要对应每条折线的名称 鼠标" left-icon="volume-o" />

    <div class="foot">
      <div class="last">最近成交</div>
      <!-- <van-pull-refresh class="list" v-model="isLoadRefresh" @refresh="refreshList"> -->
      <van-list
        v-model="isLoading"
        :finished="isFinished"
        @load="pullList"
        :offset="100"
        finished-text="人家也是有底线的"
      >
        <div class="list" v-for="(item,index) in list" :key="index">
          <div>
            <div class="styletwo">{{item.money}}</div>
            <div class="styleone">{{item.id}}</div>
          </div>
          <div>
            <div class="styletwo">{{item.money}}</div>
            <div class="styleone">{{item.id}}</div>
          </div>
          <div>
            <div class="isup">{{item.money}}</div>
          </div>
        </div>
      </van-list>
      <!-- </van-pull-refresh> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "mall",

  data() {
    return {
      curTab: 0,
      page: 0,
      isLoadRefresh: false,
      isLoading: false,
      isFinished: false,

      list: [],
      swipelist: [
        require("@/assets/images/BANNER.png"),
        require("@/assets/images/BANNER.png")
      ]
    };
  },
  computed: {},
  methods: {
    // refreshList() {
    //   this.page = 1;
    //   console.log("下拉刷新");
    //   this.isLoadRefresh = false;
    //   this.getMallList();
    // },
    pullList() {
      console.log("上拉加载");
      this.page++;
      this.getMallList();
    },

    getMallList() {
      console.log("获取列表");
      const page = this.page;
      if (page === 0) return false;
      if (page === 1) this.list = [];
      this.$api.getMarketBuyList({ p: this.page }).then(data => {
        console.log(data, "首页");
        this.isLoadRefresh = false;
        this.isLoading = false;
        if (data.code === 1) {
          if (data.data.list) {
            this.list.push(...data.data.list);
          }

          if (data.data.total / 10 <= page) {
            this.isFinished = true;
          } else {
            this.isFinished = false;
          }
        } else {
          this.isLoadRefresh = false;
          this.isLoading = false;
          this.isFinished = true;
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss'>
.mall {
  width: 100%;
  .last {
    font-size: 0.875rem;
    padding: 10px 10px 10px 10px;
    //  padding-left: 10px;
    //  padding-top: 10px;
  }
  .nav {
    width: 100%;
    height: 15%;
    text-align: center;
    line-height: 3.125rem;
  }
  .my-swipe {
    width: 100%;
    height: 30%;
  }
  // .list {
  //   width: 100%;
  //   height: 20rem;
  //   border: 1px solid red;
  // }
  // padding-top: 4rem;
  .foot {
    width: 100%;
    height: 47vh;
    overflow: scroll;
    // border: 1px solid red;

    .list {
      width: 100%;
      height: 40px;
      // border: 1px solid red;

      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 4px;
      .styleone{
        color:#949EA5;
      }
      .styletwo{
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
  }
}
</style>