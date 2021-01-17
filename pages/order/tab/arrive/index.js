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
    // latitude: 23.099994,
    // longitude: 113.324520,
    latitude: undefined,
    longitude: undefined,
    marker: {},
    circle: {},
    showMap: false
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
          const {latitude, longitude} = res
          this.reportLocation()
          const marker = [{
            latitude,
            longitude
          }]

          const circle = [{
            latitude,
            longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 100,
            strokeWidth: 2
          }]

          this.setData({
            marker,
            latitude,
            longitude,
            showMap: true,
            circle
          })
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
          console.log(res, 1111)
        }
      })
    }
  }
})
