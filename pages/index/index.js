//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad () {
 
  },

  getPhoneNumber (e) {
    const { detail: { iv, encryptedData} } = e
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(iv)
    console.log(encryptedData)
    wx.redirectTo({
      url: '/pages/checkIn/index',
    })
  }
})
