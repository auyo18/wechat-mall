// pages/rank/detail/detail.js
import request from '../../utils/request.js'
import api from '../../api/index.js'
import {
  getTotal
} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: '',
    pics: [],
    price: '',
    hasLogin: false,
    cartTotal: 0,
    currentIndex: 1,
    isFullSucreen: false,
    specificationState: false,
    count: 1,
    specification: ['S', 'M', 'L', 'XL', 'XXL'],
    specificationIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._setDetail(options)
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
    const hasLogin = app.globalData.hasLogin
    let cartTotal = 0
    if (hasLogin) {
      cartTotal = app.globalData.cartTotal
    }
    this.setData({
      hasLogin,
      cartTotal
    })
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
  changeCurrentIndex(e) {
    this.setData({
      currentIndex: e.detail.current + 1
    })
  },
  previewImage(e) {
    wx.previewImage({
      urls: this.data.pics
    })
  },
  goHome() {
    wx.reLaunch({
      url: '/pages/home/index/index'
    })
  },
  goCart() {
    wx.reLaunch({
      url: '/pages/cart/index/index'
    })
  },
  touchmoveHandler() {
    // 弹出层禁止滚动
  },
  showSpecification() {
    this.setData({
      specificationState: true
    })
  },
  hideSpecification() {
    this.setData({
      specificationState: false
    })
  },
  addCount() {
    this.setData({
      count: this.data.count + 1
    })
  },
  subtractCount() {
    if (this.data.count > 1) {
      this.setData({
        count: this.data.count - 1
      })
    }
  },
  selectSpecification(e) {
    this.setData({
      specificationIndex: e.target.dataset.index
    })
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/auth/login/login',
    })
  },
  addCart() {
    if (this.data.specificationIndex < 0) {
      wx.showToast({
        title: '请选择商品规格',
        icon: 'none'
      })
      return
    }
    if (!this.data.hasLogin) {
      this.goLogin()
      return
    }
    request({
      url: api.CartAdd,
      data: {
        id: this.data._id,
        pic: this.data.pics[0],
        title: this.data.title,
        specification: this.data.specification[this.data.specificationIndex],
        price: this.data.price,
        count: this.data.count,
        selected: true
      },
      method: 'POST'
    }).then(res => {
      getTotal().then(res => {
        this.setData({
          cartTotal: res
        })
      })
      wx.showToast({
        title: res.message,
        icon: 'success'
      })
      this.hideSpecification()
    })
  },
  _setDetail(options) {
    const detail = JSON.parse(options.detail)
    this.setData({
      id: detail.id,
      title: detail.name,
      pics: [detail.pic, detail.pic, detail.pic],
      price: detail.price,
    })
  }
})