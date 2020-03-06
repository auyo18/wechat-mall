// pages/auth/account-login/account-login.js
import api from '../../../api/index.js'
import request from '../../../utils/request.js'
import hexMD5 from '../../../utils/md5.js'
import {
  phoneReg
} from '../../../constants/index.js'
import {
  setToken,
  setUserInfo
} from '../../../utils/auth-local.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
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
  onShareAppMessage() {

  },
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value.trim()
    })
  },
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value.trim()
    });
  },
  clearInput(e) {
    switch (e.currentTarget.id) {
      case 'clear-phone':
        this.setData({
          phone: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
    }
  },
  accountLogin() {
    const {
      phone,
      password
    } = this.data
    if (!phone || !phoneReg.test(phone)) {
      wx.showToast({
        icon: 'none',
        title: '手机号不正确',
      })
      return
    }
    if (!password || password.length < 6) {
      wx.showToast({
        icon: 'none',
        title: '密码不正确',
      })
      return
    }
    request({
      url: api.AuthLoginByAccount,
      data: {
        phone,
        password: hexMD5(password)
      },
      method: 'POST'
    }).then(res => {
      if (res.token && res.userInfo) {
        //存储用户信息
        setUserInfo(res.userInfo)
        setToken(res.token)
        app.globalData.hasLogin = true
        wx.showToast({
          icon: 'none',
          title: '登录成功',
          complete() {
            setTimeout(() => {
              wx.navigateBack({
                delta: 2
              })
            }, 1000)
          }
        })
        return
      }
      wx.showToast({
        icon: 'none',
        title: res.message,
      })
    })
  }
})