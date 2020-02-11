/* 公共接口 */

import axios from '@/utils/request'

export default {
  // 获取用户信息
  getUserInfo: () => {
    return axios.post('user/user_center')
  },
}
