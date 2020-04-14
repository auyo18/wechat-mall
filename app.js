//app.js
import {
  checkLogin,
} from './utils/user.js'
import {
  checkFullSucreen,
  getTotal,
} from './utils/util.js'

App({
  onLaunch: function() {

  },
  onShow: function(options) {
    // 检测登录状态
    checkLogin().then(res => {
      this.globalData.hasLogin = true
      // 获取购物车商品总数量
      getTotal()
    }).catch(() => {
      this.globalData.hasLogin = false
      this.globalData.cartTota = 0
    })
    // 检测是否全面屏
    checkFullSucreen().then(res => {
      this.globalData.isFullSucreen = res
    })
    // 获取购物车商品数量

  },
  globalData: {
    hasLogin: false, // 是否登录
    isFullSucreen: false, //是否全面屏
    cartTotal: 0, // 购物车商品数量
  }
})