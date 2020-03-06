import {
  baseRequestUrl
} from '../constants/index.js'

export default class Base {
  request(params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseRequestUrl + params.url,
        method: params.method || 'GET',
        success({
          data
        }) {
          resolve(data)
        }
      })
    })
  }
}