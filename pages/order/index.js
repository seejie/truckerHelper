
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['currTab'],
    actions: ['setCurrTab']
  },
  // 扫码
  onscanCode () {
    // todo 一维码还是二维码，提供测试图片
    wx.scanCode({
      onlyFromCamera: true
    }).then(res => {
      console.log('扫码识别成功：', res)
    }).catch(res => {
      console.log('扫码识别失败：', res)
    })
  },

  // tab切换
  ontabChaned (e) {
    const {currTab} = e.detail
    this.setCurrTab(currTab)
  }
})
