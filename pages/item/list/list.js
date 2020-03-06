// pages/item/list/list.js
import api from '../../../api/index.js'
import request from '../../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    banners: [],
    itemList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData(options)
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
  _loadData(data) {
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: api.ItemList,
      data
    }).then(res => {
      this.setData({
        title: res.title,
        banners: res.banners,
        itemList: res.itemList
      })
      wx.hideLoading()
    })
  }
})