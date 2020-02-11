/* 公共接口 */

import axios from '@/utils/request'

export default {
  // 获取数量区间
  getNumRang: () => {
    return axios.get('index/getlimit')
  },
  gettype: () => {
    return axios.post('trade/get_otc_coin')
  },
  // 获取普通求购
  getCommonMarket: () => {
    return axios.get('common/hallshowbox')
  },

  // 获取服务商求购
  getServiceMarket: () => {
    return axios.get('common/hallshowbox')
  },

  // 统计
  getMarketTotal: data => {
    return axios.get('hall/tongji', { params: data })
  },

  // 买单列表
  getMarketBuyList: data => {
    return axios.post('trade/index', { data })
  },


  // 发布买单
  getMarketDoBuy: data => {
    return axios.post('hall/dobuy', data)
  },

  // 匹配出售
  getMarketMatchSale: data => {
    return axios.post('info/dosale', data)
  },
  // 获取交易提示
  getMarketTip: () => {
    return axios.get('common/hallshowbox')
  },
}
