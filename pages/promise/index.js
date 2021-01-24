import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user']
  },
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
      wx.showToast({
        title: '请滑动到底部，并勾选我已阅读！',
        icon: 'none',
        duration: 2000
      })
      return
    }

    const {NeedExam, ExamStatus} = this.data.user
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
