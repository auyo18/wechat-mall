// pages/user/index/index.js
import {
  getUserInfo,
  removeToken,
  removeUserInfo
} from '../../../utils/auth-local.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickname: '点击登录',
      avatar: '/static/images/avatar.png'
    },
    hasLogin: false,
    menus: [{
      name: '我的订单',
      icon: '/static/images/order.png',
      url: '/pages/user/order/order'
    }, {
      name: '我的积分',
      icon: '/static/images/integral.png',
      url: '/pages/user/integral/integral'
    }, {
      name: '地址管理',
      icon: '/static/images/address.png',
      url: '/pages/user/address/address'
    }, {
      name: '我的订单',
      icon: '/static/images/order.png',
      url: '/pages/user/order/order'
    }, {
      name: '我的积分',
      icon: '/static/images/integral.png',
      url: '/pages/user/integral/integral'
    }, {
      name: '地址管理',
      icon: '/static/images/address.png',
      url: '/pages/user/address/address'
    }, {
      name: '我的订单',
      icon: '/static/images/order.png',
      url: '/pages/user/order/order'
    }, {
      name: '我的积分',
      icon: '/static/images/integral.png',
      url: '/pages/user/integral/integral'
    }, {
      name: '地址管理',
      icon: '/static/images/address.png',
      url: '/pages/user/address/address'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取用户的登录信息
    if (app.globalData.hasLogin) {
      const userInfo = getUserInfo()
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      })
    }
    console.log(this.data.userInfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goLogin() {
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: '/pages/auth/login/login',
      })
    }
  },
  goMenu(e) {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      })
    }
  },
  exitLogin() {
    wx.showModal({
      title: '',
      content: '退出登录？',
      success: function(res) {
        if (!res.confirm) {
          return;
        }
        app.globalData.hasLogin = false
        removeToken()
        removeUserInfo()
        wx.reLaunch({
          url: '/pages/home/home'
        });
      }
    })
  }
})