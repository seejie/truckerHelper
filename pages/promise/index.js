import Toast from '../../vant/toast/toast';

Page({
  data: {
    checked: false
  },

  onChange () {
    const bool = this.data.checked
    this.setData({checked: !bool})
  },

  // 下一步
  nextStep () {
    if (!this.data.checked) {
      Toast('请滑动到底部，并勾选我已阅读！');
      return
    }
    wx.redirectTo({
      url: '/pages/notTest/index',
    })
  }
})
