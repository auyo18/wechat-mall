// pages/auth/reset/reset.js
import hexMD5 from '../../../utils/md5.js'
import api from '../../../api/index.js'
import request from '../../../utils/request.js'
import {
  phoneReg
} from '../../../constants/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    confirmPassword: ''
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
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail
    })
  },
  bindPasswordInput(e) {
    this.setData({
      password: e.detail
    })
  },
  bindConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail
    })
  },
  clearInput(e) {
    switch (e.detail) {
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
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
    }
  },
  startReset() {
    const {
      phone,
      password,
      confirmPassword
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
    if (password !== confirmPassword) {
      wx.showToast({
        icon: 'none',
        title: '两次密码输入不一致',
      })
      return
    }
    wx.showNavigationBarLoading()
    request({
      url: api.AuthReset,
      data: {
        phone,
        password: hexMD5(password)
      },
      method: 'POST'
    }).then(res => {
      wx.hideNavigationBarLoading()
      wx.showToast({
        icon: 'none',
        title: res.message || '',
        complete() {
          if (res.code === 0) {
            setTimeout(wx.navigateBack, 1000)
          }
        }
      })
    })
  }
})