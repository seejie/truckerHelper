import Toast from '../../vant/toast/toast';

const app = getApp()

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
    const {NeedExam, ExamStatus} = app.globalData.userInfo
    console.log(NeedExam)
    console.log(ExamStatus)
    let url
    // NeedExam：0不需要考试，1需要；ExamStatus：1考试状态有效，0无效
    if (NeedExam === '0' && ExamStatus === '1') {
      url = '/pages/order/index'
    } else {
      url = '/pages/notTest/index'
    }
    wx.redirectTo({url})
  }
})
