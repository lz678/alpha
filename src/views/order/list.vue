<!-- order_list -->
<template>
  <div class="order_list">
    <van-pull-refresh class="list" v-model="isLoadRefresh" @refresh="refreshList">
      <van-list
        v-model="isLoading"
        :finished="isFinished"
        @load="pullList"
        :offset="100"
        finished-text="人家也是有底线的"
      >
        <div class="item" v-for="(item,index) in list" :key="item.id">
          <div class="item_tip" v-if="tab===1">
            <div v-if="item.islock">订单已冻结·请联系客服处理或提交工单</div>

            <div class="count_down" v-if="!item.islock&&item.uploadimg">
              <van-count-down
                class="info_value"
                :time="item|filterCountDown"
                @finish="handleCountFinish(item)"
              />
              <span>{{isBuy(item.in_user_id)?'后对方未确定，订单将自动完成！':'后您未完成或举报，订单将自动完成！'}}</span>
            </div>

            <div class="count_down" v-if="!item.islock&&!item.uploadimg">
              <van-count-down
                class="info_value"
                :time="item|filterCountDown"
                @finish="handleCountFinish(item)"
              />

              <span>{{isBuy(item.in_user_id)?'后未付款将自动取消(取消次数过多可能封号)':'后买家未付款将自动取消'}}</span>
            </div>
          </div>

          <div class="info_wrap">
            <div class="info_left">
              <div class="order_id">订单号：{{item.id}}</div>
              <div class="order_type">
                类型:
                <span class="sell">{{item.istype_str}}</span>
                数量:
                <span>{{item.num}}域石</span>
              </div>
              <div class="order_price">单价：{{item.money}}</div>
              <div class="order_time" v-if="tab===0||tab===1">发布时间：{{item.createtime_text}}</div>
              <div class="order_time match" v-if="tab===1">匹配时间：{{item.tradetime_text}}</div>
              <div class="order_time" v-if="tab===2">完成时间：{{item.tradetime_text}}</div>
              <div class="order_time" v-if="tab===3">取消时间：{{item.createtime_text}}</div>
            </div>
            <div class="info_right" v-if="tab===0">
              <div class="cancel_btn" @click="handleCancelOrd(item.id)">取消</div>
            </div>
          </div>

          <div class="opt_wrap" v-if="tab===1">
            <div class="opt_btn_item" @click="viewUserInfo(item)">对方信息</div>

            <!-- 上传图片 => 买家  如果已经有图片  就是重新上传 -->
            <div
              class="opt_btn_item"
              v-if="isBuy(item.in_user_id)"
              @click="uploadImg(item.id)"
            >{{item.uploadimg>0?'重新上传':'上传图片'}}</div>

            <!-- 等待上传 => 卖家 没有图片 -->
            <div class="opt_btn_item no_img" v-if="!isBuy(item.in_user_id)&&!item.uploadimg">等待上传</div>

            <div class="opt_btn_item" v-if="item.uploadimg>0" @click="viewImg(item.id)">查看图片</div>

            <!-- 完成订单 => 卖家 图片已上传 未冻结 -->
            <div
              class="opt_btn_item"
              v-if="!isBuy(item.in_user_id)&&item.uploadimg&&!item.islock"
              @click="comfirmOrder(item.id)"
            >完成订单</div>

            <!-- 投诉 => 卖家 图片已上传 未冻结 -->
            <div
              class="opt_btn_item"
              v-if="!isBuy(item.in_user_id)&&item.uploadimg&&!item.islock"
              @click="complaintOrder(item.id,index)"
            >投诉举报</div>

            <van-uploader ref="upload" v-model="fileList" :after-read="handleUpload" />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <van-popup class="view_img" v-model="isViewImg">
      <img :src="viewImgUrl" alt />
    </van-popup>

    <user-info :isShow.sync="isUserInfo" :info="curUserInfo"></user-info>
  </div>
</template>

<script>
import { getStore } from '@/utils/utils'
import userInfo from './modules/user_info'
export default {
  name: 'order_list',
  components: { userInfo },
  props: {
    tab: Number
  },
  data () {
    return {
      apiList: ['tranMatchList', 'tranTradeingList', 'tranFinishList', 'tranCancelList'],
      page: 0,
      isLoadRefresh: false,
      isLoading: false,
      isFinished: false,

      list: [],

      userId: '',

      curId: '',

      isUserInfo: false,
      curUserInfo: {},

      nothing: false,

      fileList: [],

      isViewImg: false,
      viewImgUrl: ''
    }
  },
  filters: {
    filterCountDown (info) {
      let time = info.tradetime
      if (info.uploadimg > 0) {
        time = info.uploadimg
      }
      const overTime = new Date((time + 5400) * 1000).getTime()
      const nowTime = new Date().getTime()
      return overTime - nowTime
    }
  },

  computed: {},

  methods: {
    // 排断用户角色  卖家  买家
    isBuy (id) {
      const userId = this.userId
      if (id === userId) return true
      else return false
    },

    refreshList () {
      this.page = 1
      console.log('下拉刷新')
      this.isLoadRefresh = false
      this.getTransctionList()
    },
    pullList () {
      console.log('上拉加载')
      this.page++
      this.getTransctionList()
    },

    // 获取列表数据
    getTransctionList () {
      const page = this.page
      console.log(page, 'pagepage')
      const api = this.apiList[this.tab]
      if (page === 0) return false
      this.$api[api]({ p: this.page })
        .then(data => {
          console.log(data)
          this.isLoadRefresh = false
          this.isLoading = false
          if (data.code === 1) {
            if (page === 1) {
              this.list = data.data.list
            } else {
              this.list.push(...data.data.list)
            }

            if (data.data.total / 10 <= page) {
              this.isFinished = true
            } else {
              this.isFinished = false
            }
          } else {
            this.isLoadRefresh = false
            this.isLoading = false
            this.isFinished = true
          }
        })
        .catch(err => {
          this.isLoadRefresh = false
          this.isLoading = false
          this.isFinished = true
        })
    },

    // 定时器完成
    handleCountFinish (item) {
      // this.list.splice(i, 1)
      const { id } = item
      this.$api.checkTime({ id })
        .then(data => {
          console.log('定时器完成', data)
        })
    },

    // 取消订单
    handleCancelOrd (id) {
      // const apis = ['cancelBuy', 'cancelSale', 'cancelBuy']
      // const api = apis[this.tab]
      this.$dialog.confirm({
        message: '确认取消订单吗？'
      })
        .then(async () => {
          this.$toast.loading({
            mask: true,
            duration: 0,
            message: '提交中...'
          })
          const __token__ = await this.$store.dispatch('getCommonToken')
          console.log(__token__)
          this.$api.cancelBuy({ id, __token__ })
            .then(data => {
              this.$toast(data.msg)
              if (data.code === 1) {
                this.getTransctionList()
              }
            })
        })
        .catch(err => { })
    },

    // 查看用户信息
    viewUserInfo (info) {
      const { id } = info
      this.$api.getTransactUserInfo({ id })
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            const isSall = this.isBuy(info.in_user_id)
            const params = data.data
            params.total_money = info.total_money
            params.isSall = isSall
            this.curUserInfo = params
            this.isUserInfo = true
          } else {
            this.$toast(data.msg)
          }
        })
    },

    // 上传图片
    uploadImg (id) {
      this.curId = id
      document.querySelector('.van-uploader__input').click()
    },

    async handleUpload (file) {
      const res = await this.$store.dispatch('uploadFile', [file])
      this.$api.uploadTransactImg({ id: this.curId, img: res[0] })
        .then(data => {
          console.log(data)
          this.$toast(data.msg)
          if (data.code === 1) {
            this.fileList = []
            this.getTransctionList()
          }
        })
    },

    // 查看图片
    viewImg (id) {
      this.$api.getShowImg({ id })
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.viewImgUrl = data.data.img
            this.isViewImg = true
          } else {
            this.$toast(data.msg)
          }
        })
    },

    // 确认完成订单
    comfirmOrder (id) {
      this.$dialog.confirm({
        message: '确认完成订单吗？'
      })
        .then(async () => {
          this.$toast.loading({
            mask: true,
            duration: 0,
            message: '提交中...'
          })
          const __token__ = await this.$store.dispatch('getCommonToken')
          this.$api.confirmYesOrder({ id, __token__ })
            .then(data => {
              this.$toast(data.msg)
              if (data.code === 1) {
                this.getTransctionList()
              }
            })
        })
        .catch(err => { })
    },

    // 投诉
    complaintOrder (id, i) {
      this.$dialog.confirm({
        message: '确认投诉对方吗？'
      })
        .then(() => {
          this.$toast.loading({
            mask: true,
            duration: 0,
            message: '提交中...'
          })
          this.$api.complaintOrder({ id })
            .then(data => {
              this.$toast(data.msg)
              if (data.code === 1) {
                this.getTransctionList()
              }
            })
        })
        .catch(err => { })
    }
  },

  created () {
    this.userId = getStore('userInfo').id
  },
  mounted () { }
}
</script>

<style lang='scss'>
.order_list {
  .list {
    padding: 1.6rem;
  }
  .item {
    margin-bottom: 0.8rem;
    padding: 1.2rem;
    border-radius: 0.4rem;
    background: #34222f;
    font-size: 0.96rem;
    overflow: hidden;
  }
  .info_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba($color: #fff, $alpha: 0.8);
  }
  .order_id {
    color: #fff;
  }
  .order_type {
    margin: 0.64rem 0;
    span {
      margin-right: 0.8rem;
    }
  }
  .sell {
    color: #00f111;
  }
  .buy {
    color: #c82459;
  }
  .order_price {
    margin-bottom: 0.64rem;
  }
  .order_time.match {
    margin-top: 0.64rem;
  }

  .cancel_btn {
    width: 5.6rem;
    height: 2.72rem;
    text-align: center;
    line-height: 2.72rem;
    border-radius: 0.4rem;
    font-size: 0.96rem;
    color: #da2e63;
    border: 1px solid #da2e63;
  }

  .item_tip {
    padding-bottom: 0.64rem;
    margin-bottom: 0.64rem;
    width: 120%;
    border-bottom: 1px solid #c82459;
  }

  .count_down {
    display: flex;
    align-items: center;
  }
  .van-count-down {
    margin-right: 10px;
    color: #fff;
  }
  .opt_wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.2rem;
  }

  .opt_btn_item {
    position: relative;
    width: 30%;
    height: 2.56rem;
    line-height: 2.56rem;
    text-align: center;
    font-size: 0.96rem;
    border-radius: 0.4rem;
    color: #c82459;
    border: 1px solid #c82459;
  }

  .van-uploader {
    display: none;
    position: absolute;
    top: -9999px;
    left: -999px;
  }

  .view_img {
    width: 80%;
    z-index: 99999 !important;
    img {
      width: 100%;
    }
  }
}
</style>