// pages/test/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 开始参加培训
  onTraining () {
    wx.redirectTo({
      url: '/pages/training/index',
    })
  }
})