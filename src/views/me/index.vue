<!-- me -->
<template>
  <div class="me">
    <div class="nav">我的</div>
    <!-- <div class="header"> -->

    <div class="user">
      <div class="avatar_wrap">
        <div class="avatar">
          <img :src="require('@/assets/images/info.png')" alt />
        </div>
        <!-- <div class="lv">{{info.group_name}}</div> -->
      </div>
      <div class="info">
        <div class="nickname van-ellipsis">{{info.mobile_hidden}}</div>
        <div class="code">邀请码: {{info.yq_code}}</div>
        <div class="remarks_wrap">
          <div class="remarks van-ellipsis" v-if="info.desc">{{info.desc}}</div>
          <div class="remarks_edit" @click="handleEditRemark">
            <!-- <img src="../../assets/images/remarks_edit.png" alt /> -->
          </div>
        </div>
      </div>
    </div>

    <div class="total">
      <!-- <div class="total_item" @click="$router.push('/download')">
          <div class="total_num">{{info.huoyue}}</div>
          <div class="total_label">个人活跃度</div>
        </div>
        <div class="total_item" @click="$router.push('/stone_detail')">
          <div class="total_num">{{info.btnum}}</div>
          <div class="total_label">域石</div>
      </div>-->
      <div class="total_item" @click="$router.push('/raw_detail')">
        <div class="total_num">{{info.active_currency}}</div>
        <div class="total_label">联盟链</div>
      </div>
      <div class="total_item" @click="$router.push('/afc_detail')">
        <div class="total_num">{{info.union_integral}}</div>
        <div class="total_label">联盟积分</div>
      </div>
    </div>
    <!-- </div> -->
    <div class="hrbox"></div>
    <!-- <div class="function_wrap">
      <div class="func_item" @click="$router.push('/auth')">
        <div class="func_icon">
          <img src="../../assets/images/me_auth.png" alt />
        </div>
        <div class="func_lebel">实名认证</div>
      </div>
      <div class="func_item" @click="$router.push('/share')">
        <div class="func_icon">
          <img src="../../assets/images/me_friend.png" alt />
        </div>
        <div class="func_lebel">邀请好友</div>
      </div>

      <div class="func_item" @click="$router.push('/server')">
        <div class="func_icon">
          <img src="../../assets/images/service_provider.png" alt />
        </div>
        <div class="func_lebel">服务商</div>
      </div>

      <div class="func_item" @click="$router.push('/my_mall')">
        <div class="func_icon">
          <img src="../../assets/images/service_provider.png" alt />
        </div>
        <div class="func_lebel">我的商城</div>
      </div>
    </div> -->

    <div class="cell">
      <van-cell is-link title="实名认证" @click="$router.push('/auth')">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/sf.png" />
        </div>
        <!-- <div slot="title" class="type">
          实名认证
        </div> -->
      </van-cell>
      <van-cell is-link title="重置支付密码" @click="$router.push('/order')">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/anquan.png" />
        </div>
        <!-- <div slot="title" class="type">
          重置支付密码
        </div> -->
      </van-cell>
      <van-cell is-link title="主流币兑换" @click="$router.push('/order')">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/huan.png" />
        </div>
         <!-- <div slot="title" class="type">
          主流币兑换
        </div> -->
      </van-cell>
      <van-cell  is-link title="退出" @click="handleLogout">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/quite.png" />
        </div>
         <!-- <div slot="title" class="type">
          退出
        </div> -->
      </van-cell>
    </div>
  </div>
</template>

<script>
import { removeStore } from "@/utils/utils";
export default {
  name: "me",
  components: {},
  data() {
    return {
      info: {
        auth: 0,
        mobile_hidden:'',
        yq_code:'',
        active_currency:'',
        union_integral:'',
        avatar: "",
        btnum: 0,
        group_id: 0,
        group_name: "LV0",
        huoyue: 0,
        nickname: "",
        team: 0,
        xinyong: 0
      }
      //  "mobile_hidden": "199****4777",//手机号
      //       "yq_code": null,//邀请码
      //       "active_currency": "546.0000",//联盟链
      //       "union_integral": "5.5370",//联盟积分
      //       "avatar": "/avatar.jpg"、、
    };
  },
  computed: {},
  methods: {
    // handleBav() {
    //   this.$router.push("/download");
    // },

    handleLogout() {
      this.$api.logout().then(data => {
        console.log(data);
        if (data.code === 1) {
          this.$toast("退出登录");
          removeStore("userInfo");
          removeStore("token");
          this.$router.push("/login");
        } else {
          this.$toast(data.msg);
        }
      });
    },

    handleEditRemark() {}
  },
  async created() {
    const info = await this.$store.dispatch("getUserInfo");
    this.info = info;
  },
  mounted() {}
};
</script>

<style lang='scss'>
.me {

  .nav {
    width: 100%;
    height: 3.5rem;
    border-bottom: 1px solid #f3f3f3;
    text-align: center;
    font-size: 14px;
    line-height: 3.5rem;
  }
  // .header {
  //   padding: 1.6rem;
  //   height: 22.24rem;
  //   // background: #34222f;

  // }
  .hrbox {
    width: 100%;
    height: 10px;
    background-color: #f7f7f7;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bar_icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .user {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    margin-left: 2.5rem;
    font-size: 0.96rem;
  }

  .avatar_wrap {
    // border: 1px solid red;
    // position: relative;
    // left: 40px;
    margin-left: 1.2rem;
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    // border: 1px solid red;

    // background: #ce2b67;
    border-radius: 100%;
    border: 2px solid #fff;
    img {
      margin: 0 auto;
    }
    // overflow: hidden;
  }

  .info {
    margin-left: 1.5rem;
    line-height: 2.2rem;
  }
  .nickname {
    width: 18.4rem;
    margin-top: 1.25rem;
    font-size: 1.76rem;
  }
  .remarks_wrap {
    display: flex;
    align-items: center;
  }

  .remarks {
    margin-right: 0.8rem;
    max-width: 16.8rem;
  }

  .remarks_edit {
    width: 0.96rem;
    height: 0.96rem;
  }

  .total {
    width: 100%;
    height: 6.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2.4rem;
    text-align: center;
    font-size: 0.96rem;
    .total_label{
      color: #999;
    }
  }
  .total_item {
    flex: 1;
  }
  .total_num {
    margin-bottom: 1.04rem;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .function_wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1.6rem;
    text-align: center;
  }
  .func_item {
    margin: 0.8rem 0;
    width: 25%;
  }
  .func_icon {
    margin: 0 auto;
    margin-bottom: 1.2rem;
    width: 3.52rem;
    height: 3.52rem;
  }

  .van-cell {
    margin-bottom: 1.2rem;
  }

  .cell_icon {
    width: 20px;
    margin: 0px 10px 0px 10px;
 
  }
}
</style>