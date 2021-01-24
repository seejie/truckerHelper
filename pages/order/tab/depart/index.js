import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'
const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [storeBindingsBehavior, computedBehavior],
  storeBindings: {
    store,
    fields: ['user', 'currTab'],
    actions: ['setDeliverAddr']
  },
  data: {
    doubleConfirm: false,
    materials: [],
    orderId: '',
    address: '',
    arriveTime: ''
  },
  watch: {
    currTab: function(tab) {
      if (tab !== 'depart') return
      this.getMaterialDetail()
    },
  },
  methods: {
    // 确认装车
    onConfirmChange () {
      const doubleConfirm = !this.data.doubleConfirm
      this.setData({ doubleConfirm })
    },

    // 确认发车
    ondepart () {
      const {doubleConfirm} = this.data
      if (!doubleConfirm) {
        wx.showToast({
          title: '请先勾选确认',
          icon: 'none',
          duration: 2000
        }) 
        return
      }
      this.triggerEvent('tabChaned', {currTab: 'arrive'}, {})
    },

    // 获取物料信息
    getMaterialDetail () {
      console.log(123)
      const {Id} = this.data.user
      const deliveryNo = '2110003350510107'
      post({
        url: api.getMaterialDetail + Id + `&deliveryNo=${deliveryNo}`,
        success: res => {
          const {Lines, ShipTo, DeliveryNo, SWETTime} = res.View
          this.setData({
            materials: Lines,
            orderId: DeliveryNo,
            address: ShipTo.Address,
            arriveTime: SWETTime || ''
          })
          this.setDeliverAddr(ShipTo.Address)
        }
      })
    },
  }
})
