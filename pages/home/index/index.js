// pages/home/home.js
import api from '../../../api/index.js'
import request from '../../../utils/request.js'
import {
  checkFullSucreen
} from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    menus: [],
    saleRank: [],
    newItem: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData()
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
    wx.login({
      success: (res) => {
        console.log(res)
      }
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
  goItemList(e) {
    wx.navigateTo({
      url: '/pages/item/list/list?categoryId=' + e.currentTarget.dataset.id,
    })
  },
  goRankList(e) {
    wx.navigateTo({
      url: '/pages/rank/list/list'
    })
  },
  _loadData() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    request({
      url: api.IndexUrl
    }).then(res => {
      this.setData({
        banners: res.banners,
        menus: res.menus,
        saleRank: res.saleRank,
        newItem: res.newItem
      })
      wx.hideLoading()
    }).catch((e) => {
      wx.showLoading({
        title: e.message,
      })
      // wx.hideLoading()
    })
  }
})