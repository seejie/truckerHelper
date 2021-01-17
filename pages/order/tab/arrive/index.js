import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['deliverAddr'],
  },
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
  },
  ready () {
    this.getCurrLocation()
  },
  methods: {
    // 获取当前位置
    getCurrLocation () {
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          console.log(res)
          const latitude = res.latitude
          const longitude = res.longitude
          this.reportLocation()
        }
       })
    },

    // 上报地理位置
    reportLocation () {
      const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      const longitude = '116.44355'
      const latitude = '39.9219'
      post({
        url: api.reportLocation + `${driverId}&longitude=${longitude}&latitude=${latitude}`,
        success: res => {
          console.log(1111)
          console.log(res)
        }
      })
    }
  }
})
