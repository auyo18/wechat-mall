// pages/rank/list/list.js
import api from '../../../api/index.js'
import request from '../../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
      url: api.RankList
    }).then(res => {
      this.setData({
        list: res.data
      })
      wx.hideLoading()
    })
  },
  goRankDetail(e) {
    wx.navigateTo({
      url: '/pages/rank/detail/detail?detail=' + JSON.stringify(e.currentTarget.dataset.detail)
    })
  }
})