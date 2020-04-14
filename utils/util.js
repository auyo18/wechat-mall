import api from '../api/index.js'
import request from './request.js'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const checkFullSucreen = () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success(res) {
        if (res.screenHeight - res.windowHeight - res.statusBarHeight - 32 > 72) {
          resolve(true)
        } else {
          reject()
        }
      },
      fail() {
        reject()
      }
    })
  })
}

const getTotal = () => {
  return new Promise((resolve, reject) => {
    const app = getApp()
    request({
      url: api.CartTotal
    }).then(res => {
      const total = res.data.total
      app.globalData.cartTotal = total
      resolve(total)
    })
  })
}

module.exports = {
  formatTime,
  checkFullSucreen,
  getTotal,
}