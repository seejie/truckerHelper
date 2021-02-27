import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
const computedBehavior = require('miniprogram-computed')
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'

Component({
  behaviors: [storeBindingsBehavior, computedBehavior],
  storeBindings: {
    store,
    fields: ['user', 'currTab', 'sysConfig', 'DeliveryNo', 'deliverAddr', 'currLoc', 'distance', 'stopCheckStatus'],
    actions: ['setDockNo', 'setCheckInTime', 'setOrderStatus', 'setStopCheckStatus']
  },
  watch: {
    currTab: function(tab) {
      if (tab !== 'queue') return
      this.getOrderInfo()
    },
  },
  methods: {
    // 获取订单信息
    getOrderInfo () {
      const {user: {Id}, sysConfig, DeliveryNo} = this.data
      const config = sysConfig.find(el => el.category === 'IntervalRefreshOrder')
      const frequency = config.key_name
      console.log('查询间隔：', frequency)

      let timer = null
      const request = () => {
        if (this.stopCheckStatus) {
          clearInterval(timer)
          return
        }

        post({
          url: api.getOrderInfo + Id + `&deliveryNo=${DeliveryNo}`,
          success: res => {
            console.log('订单状态：', res.view)
            const {DockNo, CheckInTime, OrderStatus} = res.view

            // 待叫号，停止上报位置
            if (OrderStatus === '2') {
              this.setStopReportLoc(true)
            } else if (OrderStatus === '7' || OrderStatus === '8') {
              // 卸货完成，停止查询状态
              this.setStopCheckStatus(true)
            }
            
            this.setOrderStatus(OrderStatus)
            this.setDockNo(DockNo)
            this.setCheckInTime(CheckInTime)
          }
        })
      }

      request()
      timer = setInterval(request, +frequency * 1000)
      this.stopCheckStatus(false)
      // todo
      // setTimeout(() => {
      //   this.setDockNo(20)
      //   this.setCheckInTime('2021-02-02')
      // }, 3000)

      // 判断订单状态，待卸货
      // todo
      setTimeout(() => {
        this.triggerEvent('tabChaned', {currTab: 'unload'}, {})
      }, 6000)
    },
  }
})
