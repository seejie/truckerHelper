
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['currTab'],
    actions: ['setCurrTab']
  },

  // tab切换
  ontabChaned (e) {
    const {currTab} = e.detail
    this.setCurrTab(currTab)
  }
})
