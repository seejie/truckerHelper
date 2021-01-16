//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    needUserAuth: true
  },

  onReady () {
    const user = app.globalData.userInfo
    const bool = !user
    this.setData({needUserAuth: bool})
    console.log(user)
  },

  // 新用户，申请用户授权电话信息
  getPhoneNumber (e) {
    const { detail: { iv, encryptedData} } = e
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(iv)
    console.log(encryptedData)
    this.onRecord()
  },

  onRecord () {
    wx.redirectTo({
      url: '/pages/checkIn/index',
    })
  }
})
