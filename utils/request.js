import {
  getToken,
  removeToken,
  removeUserInfo
} from '../utils/auth-local.js'
import api from '../api/index.js'

function request({
  url,
  data,
  method = 'GET'
}) {
  return new Promise((resolve, reject) => {
    const token = getToken()
    wx.request({
      url,
      method,
      data,
      header: {
        Authorization: token
      },
      success({
        data,
        statusCode,
        errMsg
      }) {
        if (statusCode === 401) {
          //需要登录后才可以操作
          removeToken()
          removeUserInfo()
          wx.navigateTo({
            url: '/pages/auth/login/login'
          })
        }
        if (statusCode === 200) {
          resolve(data)
        } else {
          reject(errMsg)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function(res) {
        console.log(res, 'login')
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res)
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

function getUserInfo() {
  return new Promise(function(resolve, reject) {
    wx.getSetting({
      withCredentials: true,
      success: function(res) {
        console.log(res, 'getUserInfo')
        if (res.errMsg === 'getUserInfo:ok') {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function(err) {
        console.log(err, 'fail')
        reject(err)
      }
    })
  });
}

export default request