import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'
import { toast } from '../../../../lib/utils'
const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [storeBindingsBehavior, computedBehavior],
  storeBindings: {
    store,
    fields: ['user', 'currTab', 'DeliveryNo'],
    actions: ['setDeliverAddr']
  },
  data: {
    doubleConfirm: false,
    materials: [],
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
      if (!doubleConfirm) return toast('请先勾选确认')
      this.triggerEvent('tabChaned', {currTab: 'arrive'}, {})
    },

    // 获取物料信息
    getMaterialDetail () {
      const {user: {Id}, DeliveryNo} = this.data

      post({
        url: api.getMaterialDetail + Id + `&deliveryNo=${DeliveryNo}`,
        success: res => {
          const {Lines, ShipTo, SWETTime} = res.View
          this.setData({
            materials: Lines,
            address: ShipTo.Address,
            arriveTime: SWETTime || ''
          })
          this.setDeliverAddr(ShipTo.Address)
        }
      })
    },
  }
})
