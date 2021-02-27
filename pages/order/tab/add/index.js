import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'
import {toast} from '../../../../lib/utils'

Component({ 
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user', 'DeliveryNo', 'OrderStatus'],
    actions: ['setDeliveryNo']
  },
  data: {
    orderNo: ''
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

    oninput ({detail}) {
      this.setData({orderNo: detail})
    },

    // 扫码
    onscanCode () {
      wx.scanCode({
        onlyFromCamera: true,
        scanType: ['barCode', 'qrCode'],
        success: res => {
          // console.log('扫码识别成功：', res.result)
          this.setData({orderNo: res.result})
        },
        fail: err => {
          console.log('扫码识别失败：', err)
          toast('扫码失败，请重试~')
        },
      })
    },
  }
})
