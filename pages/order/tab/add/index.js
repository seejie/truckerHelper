import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'
import {toast} from '../../../../lib/utils'

Component({ 
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user'],
    actions: ['setDeliveryNo']
  },
  data: {
    currTab: 'order',
    orderNo: '2110003350510107'
  },
  methods: {
    // 添加订单
    addOrder () {
      const {user: {Id}, orderNo} = this.data
      if (!orderNo)return toast('未填写订单~')

      post({
        url: api.submitOrder + Id + `&deliveryNo=${orderNo}`,
        success: res => {
          this.setDeliveryNo(orderNo)
          this.triggerEvent('tabChaned', {currTab: 'depart'}, {})
        },
      })
    },

    oninput (e) {
      const orderNo = e.detail.value
      this.setData({orderNo})
    },

    // 扫码
    onscanCode () {
      // todo 一维码还是二维码，提供测试图片
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          console.log('扫码识别成功：', res)
        },
        fail: err => {
          console.log('扫码识别失败：', err)
        },
        complete: () => {
          this.setData({orderNo: '2110003350510107'})
        }
      })
    },
  }
})
