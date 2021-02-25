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
    console.log(this.data.sysConfig)
    const obj = this.data.find(el => el.category === 'DriverTrainingVideo')
    this.setData({videoUrl: obj.description})
  },

  // 开始考试
  onExam () {
    console.log(1111)
    wx.redirectTo({
      url: '/pages/exam/index',
    })
  }
})