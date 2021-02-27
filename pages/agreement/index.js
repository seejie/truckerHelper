import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user', 'sysConfig']
  },
  data: {
    
  },
  tipAgree () {
    wx.redirectTo({
      url: '/pages/checkIn/index',
    })
  }
})