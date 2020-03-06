// pages/user/login/login.js
import {
  checkLogin,
  loginByWeixin,
  loginByWeixinMobile
} from '../../../utils/user.js'
import request from '../../../utils/request.js'
import api from '../../../api/index.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionKey: ''
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
  wxlogin: function() {
    const self = this;
    wx.login({
      success: (res) => {
        request({
          url: api.AuthWXLogin,
          data: {
            code: res.code,
          }
        })
      }
    })
  },
  onGotPhoneNumber(e) {
    wx.showNavigationBarLoading()
    const {
      detail: {
        encryptedData,
        errMsg,
        iv
      }
    } = e
    if (errMsg !== 'getPhoneNumber:ok') {
      if (errMsg === 'getPhoneNumber:fail user deny') {
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重试',
        })
        wx.hideNavigationBarLoading()
        return false
      }
      wx.showToast({
        icon: 'none',
        title: '登录失败，请重试',
      })
      wx.hideNavigationBarLoading()
      return false
    }

    console.log(e, 'phpne')
    checkLogin().catch(() => {
      loginByWeixinMobile(encryptedData, iv).then(res => {
        app.globalData.hasLogin = true
        wx.hideNavigationBarLoading()
        wx.showToast({
          icon: 'none',
          title: '登录成功',
          complete() {
            setTimeout(wx.navigateBack, 1000)
          }
        })
      }).catch((err) => {
        app.globalData.hasLogin = false
        wx.hideNavigationBarLoading()
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重试',
        })
      })
    })
  },
  onWxLogin(e) {
    wx.showNavigationBarLoading()
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重试',
        })
        wx.hideNavigationBarLoading()
        return false
      }
      wx.showToast({
        icon: 'none',
        title: '登录失败，请重试',
      })
      wx.hideNavigationBarLoading()
      return false
    }

    checkLogin().catch(() => {
      loginByWeixin(e.detail).then(res => {
        app.globalData.hasLogin = true
        wx.hideNavigationBarLoading()
        wx.showToast({
          icon: 'none',
          title: '登录成功',
          complete() {
            setTimeout(wx.navigateBack, 1000)
          }
        })
      }).catch((err) => {
        app.globalData.hasLogin = false
        wx.hideNavigationBarLoading()
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重试',
        })
      })
    })
  },
  accountLogin() {
    wx.navigateTo({
      url: '/pages/auth/account-login/account-login'
    });
  }
})