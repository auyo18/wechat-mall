//app.js
import {
  checkLogin
} from './utils/user.js'

App({
  onLaunch: function() {

  },
  onShow: function(options) {
    // 检测登录状态
    checkLogin().then(res => {
      this.globalData.hasLogin = true
    }).catch(() => {
      this.globalData.hasLogin = false
    })
  },
  globalData: {
    hasLogin: false
  }
})