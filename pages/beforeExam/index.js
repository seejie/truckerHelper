import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user', 'sysConfig']
  },
  data: {
    videoUrl: ''
  },

  onLoad () {
    this.getVideoUrl()
  },

  getVideoUrl () {
    const obj = this.data.sysConfig.find(el => el.category === 'DriverTrainingVideo')
    this.setData({videoUrl: obj.description})
  },

  // 开始考试
  onExam () {
    wx.redirectTo({
      url: '/pages/exam/index',
    })
  }
})