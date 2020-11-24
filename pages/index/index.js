//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad () {
 
  },

  onCheckIn () {
    wx.redirectTo({
      url: '/pages/checkIn/index',
    })
  }
})
