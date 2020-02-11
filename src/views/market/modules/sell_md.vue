<!-- market_md" -->
<template>
  <van-popup class="market_md" v-model="isShowMd">
    <div class="header">
      <div class="close"></div>
      <span class="title">卖 给 TA</span>
      <div class="close" @click="isShowMd = false">
        <van-icon name="close" />
      </div>
    </div>
    <div class="content">
      <div class="sell_item">
        <div class="label">单价(¥)</div>
        <div class="value">{{info.money}}</div>
      </div>

      <div class="sell_item">
        <div class="label">
          数
          <span>量</span>
        </div>
        <div class="value">{{info.num}}</div>
      </div>
      <div class="sell_item">
        <div class="label">总价(¥)</div>
        <div class="value">{{info.total_money}}</div>
      </div>

      <!-- <van-field v-model="tradepass" type="password" clearable label="安全密码" placeholder="请输入安全密码" /> -->

      <van-field class="password" v-model="tradepass" placeholder="请输入验证码">
        <!-- <div slot="left-icon">
          <div class="login_icon">
            <img class="icon" slot="left-icon" src="./static/images/login_code.png" alt />
          </div>
        </div>-->

        <!-- :disabled="isDisabled" -->
        <!--  @click="getValidImg" -->
        <van-button
          slot="button"
          class="code_btn"
          size="small"
          type="primary"
          @click="getSmsCode"
        >发送验证码</van-button>
        <!--          
          v-if="!showReminderTime"
        :disabled="!info.mobile" <div class="verify_timer" slot="button" v-else>重新发送({{reminderTime}}s)</div>-->
      </van-field>

      <div class="btn_wrap">
        <div class="btn" :class="{'confirm':tradepass}" @click="handleSale">确定卖出</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getStore } from '@/utils/utils'
export default {
  name: 'market_md',
  components: {},
  props: {
    isShow: Boolean,
    info: Object
  },
  data () {
    return {
      tradepass: '',
      mobile: ''
    }
  },
  computed: {
    isShowMd: {
      get () {
        return this.isShow
      },
      set (val) {
        this.tradepass = ''
        this.$emit('update:isShow', val)
      }
    },
  },
  methods: {
    getSmsCode () {
      this.$api.getSmsCode({
        mobile: this.mobile,
        event: 'sale'
      })
        .then(data => {
          if (data.code === 1) {
            this.$toast('验证码已发送')
          } else {
            this.$toast(data.msg)
          }
        })
    },

    validate () {
      console.log(213)
      let res = true
      const tradepass = this.tradepass
      if (tradepass === '') {
        res = false
        this.$toast('请输入短信验证码')
        return false
      }
      return res
    },



    async handleSale () {
      const res = this.validate()
      if (!res) return false
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '提交中...'
      })
      const __token__ = await this.$store.dispatch('getCommonToken')
      console.log(__token__)
      this.$api.getMarketMatchSale({ id: this.info.id, tradepass: this.tradepass, __token__ })
        .then(data => {
          if (data.code === 1) {
            this.$toast(data.msg)
            this.$emit('changeData')
            this.isShowMd = false
          } else {
            this.$toast(data.msg)
          }
        })
    },
  },
  created () {
    const mobile = getStore('userInfo').mobile
    console.log(mobile, 'mobilemobile')
    this.mobile = mobile
  },
  mounted () { }
}
</script>

<style lang='scss'>
.van-overlay {
  z-index: 2012 !important;
}
.market_md {
  z-index: 2013 !important;
  .header {
    display: flex;
    align-items: center;
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 1.44rem;
  }
  .close {
    width: 1.6rem;
    height: 1.6rem;
    font-size: 1.6rem;
  }

  .content {
    margin-top: 2.4rem;
  }
  .sell_item {
    display: flex;
    align-items: center;
    font-size: 1.44rem;
    line-height: 4rem;

    .label {
      width: 5rem;
      margin-right: 2.8rem;
      color: #bc0d46;
      span {
        margin-left: 1.5rem;
      }
    }
    .value {
      flex: 1;
    }
  }
  .van-field {
    margin-top: 1.6rem;
    border-radius: 1.36rem;
    border: 0.08rem solid #da2e63;
  }
  .van-cell {
    padding: 0.72rem 1.28rem;
  }
  .van-cell__title {
    margin-left: 0;
  }
  .van-field__label {
    width: 5.6rem;
    border-right: 1px solid #da2e63;
  }
  .van-field__control::-webkit-input-placeholder {
    color: #fff;
  }
  .van-field__control {
    color: #fff;
  }
  .btn {
    margin-top: 2.4rem;
    margin-bottom: 10px;
  }
  .van-button--primary {
    background-color: #da2e63;
    border: 1px solid #da2e63;
  }
}
</style>