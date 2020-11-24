Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum: '',
    tel: '',
    idCard: '',
    travelCodeImgs: [],
    healthCodeImgs: []
  },

  onLoad (options) {

  },

  // 输入车牌号
  onInputCarNum (e) {
    console.log(e)
  },

  onsubmit () {
    console.log('提交')
    wx.redirectTo({
      url: '/pages/notTest/index',
      // url: '/pages/training/index',
    })
  }
})
