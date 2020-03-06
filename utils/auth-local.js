const TokenKey = 'TOKEN'
const UserInfoKey = 'USER_INFO'

export function getToken() {
  return wx.getStorageSync(TokenKey)
}

export function setToken(token) {
  return wx.setStorageSync(TokenKey, 'Bearer ' + token)
}

export function removeToken() {
  return wx.removeStorageSync(TokenKey)
}

export function getUserInfo() {
  return wx.getStorageSync(UserInfoKey)
}

export function setUserInfo(userInfo) {
  return wx.setStorageSync(UserInfoKey, userInfo)
}

export function removeUserInfo() {
  return wx.removeStorageSync(UserInfoKey)
}