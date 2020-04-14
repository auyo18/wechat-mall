// components/detail/detail.js
import request from '../../utils/request.js'
import api from '../../api/index.js'
import {
  getTotal
} from '../../utils/util.js'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _id: {
      type: Number
    },
    title: {
      type: String,
      value: ''
    },
    pics: {
      type: Array,
      value: []
    },
    price: {
      type: String,
      value: ''
    },
    hasLogin: {
      type: Boolean,
      value: false
    },
    cartTotal: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 1,
    isFullSucreen: false,
    specificationState: false,
    count: 1,
    specification: ['S', 'M', 'L', 'XL', 'XXL'],
    specificationIndex: -1
  },
  attached() {
    this.setData({
      isFullSucreen: app.globalData.isFullSucreen
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
        this.showSpecification()
        return
      }
      if (!this.data.hasLogin) {
        this.goLogin()
        return
      }
      request({
        url: api.Cartadd,
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
    }
  }
})