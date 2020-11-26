// pages/training/index.js
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
    this.getQuestions()
  },

  // 获得题目
  getQuestions () {

  },

  // 开始考试
  onExam () {
    wx.redirectTo({
      url: '/pages/exam/index',
    })
  }
})