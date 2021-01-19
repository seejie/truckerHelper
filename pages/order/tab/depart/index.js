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
      wx.startLocationUpdateBackground({
        success: res => {
          // console.log(res)
        },
        fail: err => {
          // console.log(err)
          wx.showModal({
            title: '温馨提示',
            content: '为更好体验服务',
            confirmText:"同意",
            cancelText:"拒绝",
            success (res) {
              if (!res.confirm)  return
              wx.openSetting({
                success: res => {
                  // console.log(res)
                },
                fail: err => {
                  // console.log(err)
                }
              })
            }
          })
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

    locationChanged (...arr) {
      console.log(arr, 123)
    }
  }
})
