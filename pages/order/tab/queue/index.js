import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
const computedBehavior = require('miniprogram-computed')
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'

Component({
  behaviors: [storeBindingsBehavior, computedBehavior],
  storeBindings: {
    store,
    fields: ['user', 'currTab', 'sysConfig', 'DeliveryNo', 'deliverAddr', 'currLoc', 'distance'],
    actions: ['setDockNo', 'setCheckInTime']
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

      const request = () => {
        post({
          url: api.getOrderInfo + Id + `&deliveryNo=${DeliveryNo}`,
          success: res => {
            console.log('订单状态：', res.view)
            
            const {DockNo, CheckInTime} = res.view
            this.setDockNo(DockNo)
            this.setCheckInTime(CheckInTime)
          }
        })
      }

      request()
      setInterval(request, +frequency * 1000)

      // todo
      setTimeout(() => {
        this.setDockNo(20)
        this.setCheckInTime('2021-02-02')
      }, 3000)
    },
  }
})
