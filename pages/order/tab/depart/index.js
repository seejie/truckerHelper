import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    actions: ['setDeliverAddr']
  },
  data: {
    doubleConfirm: false,
    materials: [],
    orderId: '',
    address: '',
    arriveTime: ''
  },
  ready () {
    this.getMaterialDetail()
    this.getOrderInfo()
  },
  methods: {
    // 确认装车
    onConfirmChange () {
      const doubleConfirm = !this.data.doubleConfirm
      this.setData({ doubleConfirm })
    },

    // 确认发车
    ondepart () {
      this.triggerEvent('tabChaned', {currTab: 'arrive'}, {})
    },

    // 获取订单信息
    getOrderInfo () {
      // const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      // const deliveryNo = '21100006Supplier001'
      // post({
      //   url: api.getOrderInfo + driverId + `&deliveryNo=${deliveryNo}`,
      //   success: res => {
      //     const order = res.view
      //   }
      // })
    },

    // 获取物料信息
    getMaterialDetail () {
      const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      const deliveryNo = '21100006Supplier001'
      post({
        url: api.getMaterialDetail + driverId + `&deliveryNo=${deliveryNo}`,
        success: res => {
          const {Lines, ShipTo, DeliveryNo} = res.View
          this.setData({
            materials: Lines,
            orderId: DeliveryNo,
            address: ShipTo.Address,
            arriveTime: ''
          })
          // console.log(ShipTo)
          this.setDeliverAddr(ShipTo.Address)
        }
      })
    }
  }
})
