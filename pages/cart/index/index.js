// pages/cart/index/index.js
import api from '../../../api/index.js'
import request from '../../../utils/request.js'
import {
  getTotal
} from '../../../utils/util.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: false,
    list: [],
    totalPrice: 0,
    isSelectedAll: false
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
    if (app.globalData.hasLogin) {
      this.setData({
        hasLogin: true
      })
      this._loadData()
    } else {
      this.setData({
        hasLogin: false
      })
    }
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
  _loadData() {
    request({
      url: api.CartList
    }).then(res => {
      const list = res.data
      this.setData({
        list
      })
      this.calculatePriceAndInspectSelected()
    })
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/auth/login/login',
    })
  },
  handleSelect(e) {
    request({
      url: api.CartSelect,
      data: {
        id: e.currentTarget.dataset.id,
        specification: e.currentTarget.dataset.specification
      },
      method: 'POST'
    }).then(res => {
      this.setData({
        list: res.data
      })
      this.calculatePriceAndInspectSelected()
    })
  },
  subtractCount(e) {
    const count = e.currentTarget.dataset.count
    if (count > 1) {
      request({
        url: api.CartChangeCount,
        data: {
          id: e.currentTarget.dataset.id,
          count: count - 1,
          specification: e.currentTarget.dataset.specification
        },
        method: 'POST'
      }).then(res => {
        getTotal()
        this.setData({
          list: res.data
        })
        this.calculatePriceAndInspectSelected()
      })
    }
  },
  addCount(e) {
    const count = e.currentTarget.dataset.count
    request({
      url: api.CartChangeCount,
      data: {
        id: e.currentTarget.dataset.id,
        count: count + 1,
        specification: e.currentTarget.dataset.specification
      },
      method: 'POST'
    }).then(res => {
      getTotal()
      this.setData({
        list: res.data
      })
      this.calculatePriceAndInspectSelected()
    })
  },
  calculatePriceAndInspectSelected() {
    let totalPrice = 0
    let isSelectedAll = true
    this.data.list.forEach(item => {
      if (item.selected) {
        totalPrice += item.price * item.count
      } else {
        isSelectedAll = false
      }
    })
    this.setData({
      totalPrice,
      isSelectedAll
    })
  },
  handleSelectAll() {
    request({
      url: api.CartSelectAll,
      data:{
        isSelectedAll: this.data.isSelectedAll
      },
      method: 'POST'
    }).then(res => {
      this.setData({
        list: res.data
      })
      this.calculatePriceAndInspectSelected()
    })
  }
})