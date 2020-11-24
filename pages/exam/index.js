// pages/exam/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },

  // 结束考试
  onSubmit () {
    wx.navigateTo({
      url: '/pages/order/index',
    })
  }
})