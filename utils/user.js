import request from '../utils/request.js'
import {
  getToken,
  getUserInfo,
  setToken,
  setUserInfo
} from './auth-local.js'
import api from '../api/index.js'

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          resolve(res)
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

/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        reject(false);
      }
    })
  })
}

/**
 * 判断用户是否登录
 */
export function checkLogin() {
  return new Promise(function(resolve, reject) {
    if (getToken() && getUserInfo()) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  })
}

/**
 * 调用微信登录
 */
export function loginByWeixinMobile(encryptedData, iv) {
  return new Promise(function(resolve, reject) {
    return login().then((res) => {
      //登录远程服务器
      request({
        url: api.AuthLoginByWeixinMobile,
        data: {
          code: res.code,
          encryptedData,
          iv
        },
        method: 'POST'
      }).then(res => {
        if (res.token && res.userInfo) {
          //存储用户信息
          setUserInfo(res.userInfo)
          setToken(res.token)
          resolve(res)
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      });
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * 调用微信登录
 */
export function loginByWeixin(userInfo) {
  return new Promise(function(resolve, reject) {
    return login().then((res) => {
      //登录远程服务器
      request({
        url: api.AuthLoginByWeixin,
        data: {
          code: res.code,
          userInfo: userInfo
        },
        method: 'POST'
      }).then(res => {
        if (res.token && res.userInfo) {
          //存储用户信息
          setUserInfo(res.userInfo)
          setToken(res.token)
          resolve(res)
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      });
    }).catch((err) => {
      reject(err)
    })
  })
}