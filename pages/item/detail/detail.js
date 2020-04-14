// pages/item/detail/detail.js
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
    cartTotal: 0
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
  _setDetail(options) {
    const detail = JSON.parse(options.detail)
    this.setData({
      id: detail.id,
      title: detail.name,
      pics: [detail.listPicUrl, detail.listPicUrl, detail.listPicUrl],
      price: detail.retailPrice,
    })
  }
})