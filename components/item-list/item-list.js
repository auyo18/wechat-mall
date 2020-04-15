// components/item-list/item-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e) {
      wx.navigateTo({
        url: '/pages/detail/detail?detail=' + JSON.stringify(e.currentTarget.dataset.detail)
      })
    }
  }
})