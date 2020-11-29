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

    const score = 80
    const exp = '2020-12-31'
    const msg = `您本次考试得分 ${score} ，恭喜通过！本次考试成绩有效期 10 天，有效期截止日期 ${exp} `

    wx.showModal({
      title: '恭喜通过',
      content: msg,
      showCancel: false,
      success (res) {
        if (!res.confirm) return
        
        wx.redirectTo({
          url: '/pages/order/index',
        })
      }
    })
  }
})