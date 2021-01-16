const computedBehavior = require('miniprogram-computed')
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'

Component({
  behaviors: [computedBehavior],
  data: {
    doubleConfirm: false,
    materials: []
  },
  ready () {
    this.initStore()
    this.getMaterialDetail()
    this.getOrderInfo()
  },
  computed: {

  },
  methods: {
    // 初始化store
    initStore () {
      this.storeBindings = createStoreBindings(this, {
        store,
        actions: ['setCurrOrder']
      })
    },

    // 确认装车
    onConfirmChange () {
      const doubleConfirm = !this.data.doubleConfirm
      this.setData({ doubleConfirm })
    },

    // 确认发车
    ondepart () {
      const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      const longitude = ''
      const latitude = ''
      post({
        url: api.reportLocation + `${driverId}&longitude=${longitude}&latitude=${latitude}`,
        success: res => {
          console.log(res)
        }
      })
      this.triggerEvent('tabChaned', {currTab: 'arrive'}, {})
    },

    // 获取订单信息
    getOrderInfo () {
      const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      const deliveryNo = '21100006Supplier001'
      post({
        url: api.getOrderInfo + driverId + `&deliveryNo=${deliveryNo}`,
        success: res => {
          const order = res.view
          console.log(order)

          // this.setCurrOrder([{
          //   label: '订单编号',
          //   value: order.OrderId
          // }, {
          //   label: '送货地址',
          //   value: '上海市松江区***'
          // }, {
          //   label: '要求到达时间',
          //   value: '2020-10-19 07:30'
          // }])
        }
      })
    },

    // 获取物料信息
    getMaterialDetail () {
      const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      const deliveryNo = '21100006Supplier001'
      post({
        url: api.getMaterialDetail + driverId + `&deliveryNo=${deliveryNo}`,
        success: res => {
          const {Lines, ShipTo} = res.View
          this.setData({materials: Lines})
          console.log(ShipTo)
        }
      })
    }
  }
})
