

import axios from '@/utils/request'

export default {
  // 待匹配列表
  tranMatchList: (data) => {
    return axios.get('info/buylist', { params: data })
  },

  // 交易中列表
  tranTradeingList: data => {
    return axios.get('info/tradeing', { params: data })
  },

  // 完成列表
  tranFinishList: (data) => {
    return axios.get('info/finish', { params: data })
  },

  // 取消列表
  tranCancelList: (data) => {
    return axios.get('info/cancellist', { params: data })
  },


  // 获取交易对方资料
  getTransactUserInfo: (data) => {
    return axios.get('info/showinfo', { params: data })
  },

  // 获取转账图片
  getShowImg: (data) => {
    return axios.get('info/showimg', { params: data })
  },

  // 上传转账图片
  uploadTransactImg: (data) => {
    return axios.get('info/uplpadimg', { params: data })
  },

  // 确认订单完成
  confirmYesOrder: (data) => {
    return axios.post('info/yesorders', data)
  },

  // 投诉订单
  complaintOrder: (data) => {
    return axios.get('info/tousu', { params: data })
  },

  // 取消出售
  cancelSale: (data) => {
    return axios.post('info/unsale', data)
  },

  // 取消买入
  cancelBuy: (data) => {
    return axios.post('info/unbuy', data)
  },

  // 主动检查
  checkTime: (data) => {
    return axios.post('info/checkTime', data)
  },
}
