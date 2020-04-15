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
    isSelectedAll: false,
    curItemIndex: -1,
    startX: null,
    startY: null
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
    this._loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      curItemIndex: -1
    })
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
    if (app.globalData.hasLogin) {
      this.setData({
        hasLogin: true,
      })
      request({
        url: api.CartList
      }).then(res => {
        const list = res.data
        this.setData({
          list
        })
        this.calculatePriceAndInspectSelected()
      })
    } else {
      this.setData({
        hasLogin: false
      })
    }
  },
  goLogin() {
    if (app.globalData.hasLogin) {
      this._loadData()
      return
    }
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
  deleteItem() {
    const curItem = this.data.list[this.data.curItemIndex]
    console.log(this.data.curItemIndex)
    request({
      url: api.CartRemove,
      data: {
        id: curItem.id,
        specification: curItem.specification
      },
      method: 'POST'
    }).then(res => {
      getTotal()
      this.setData({
        list: res.data,
        curItemIndex: -1,
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
      data: {
        isSelectedAll: this.data.isSelectedAll
      },
      method: 'POST'
    }).then(res => {
      this.setData({
        list: res.data
      })
      this.calculatePriceAndInspectSelected()
    })
  },
  touchS(e) {
    if (e.touches.length) {
      this.setData({
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
      })
    }
  },
  touchM(e) {
    const index = e.currentTarget.dataset.index
    if (e.touches.length && this.data.startX) {
      const differX = e.touches[0].clientX - this.data.startX
      const differY = Math.abs(e.touches[0].clientY - this.data.startY)
      if (index !== this.data.curItemIndex) {
        this.setData({
          curItemIndex: -1
        })
      } else {
        if (differX > 50) {
          this.setData({
            curItemIndex: -1
          })
        }
      }
      if (differX < -50 && differY < 50) {
        this.setData({
          curItemIndex: index
        })
      }
    }
  },
  touchE(e) {
    this.setData({
      startX: null
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?detail=' + JSON.stringify(e.currentTarget.dataset.detail)
    })
  }
})