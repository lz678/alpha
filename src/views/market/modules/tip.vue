<template>
  <van-popup class="market_tip" v-model="isShowMd">
    <div class="first" @click="role">
      <div class="top" :class="{typeone:select==1}">买方</div>
      <div class="top" :class="{typeone:select==2}">卖方</div>
    </div>
    <div class="price">价格区间</div>
    <div class="priceone">1-4</div>
    <!-- <div class="content" v-html="info"></div> -->
    <div class="tip_btn" @click="isShowMd =false">确 认</div>
  </van-popup>
</template>

<script>
export default {
  name: "market_tip",
  components: {},
  props: {
    isShow: Boolean
  },
  data() {
    return {
      select: 1,
      info: {
        side: 1
      }
    };
  },

  computed: {
    isShowMd: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      }
    }
  },
  watch: {},

  methods: {
    getMarketTip() {
      this.$api.getMarketTip().then(data => {
        console.log(data, "klklkl");
        if (data.code === 1) {
          var regRN = /\r\n/g;
          let str = data.data.content;
          str = str.replace(regRN, "<br />");
          this.info = str;
        } else {
          this.isShowMd = false;
        }
      });
    },
    role(e) {
      console.log(e);

      console.log(e.target.innerText);
      if (e.target.innerText == "买方") {
        this.select = 1;
        return;
      }
      if (e.target.innerText == "卖方") {
        this.select = 2;
        return;
      }
    }
  },

  created() {
    // this.getMarketTip();
  },

  mounted() {}
};
</script>

<style lang='scss'>
.market_tip {
  width: 80%;
  padding: 15px;
  border-radius: 10px;
  z-index: 2013 !important;
  .price{
    margin-top: 6px;
  }
  .first {
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
  // .top {
  //   text-align: center;
  //   font-size: 16px;
  // }
  .content {
    margin-top: 1.6rem;
    height: 300px;
    line-height: 20px;
    overflow: auto;
    border-radius: 10px;
  }

  .tip_btn {
    margin: 20px auto 0;
    width: 130px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 40px;
    background: #da2e63;
    color: #fff;
  }
}
</style>

