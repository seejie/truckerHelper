import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'
const QQMapWX = require('../../../../utils/qqmap-wx-jssdk');
const qqmapsdk = new QQMapWX({
  key: '7VFBZ-RQPCW-SPCR4-RGSOY-VVYPF-UIBK7'
})

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['deliverAddr', 'currLoc', 'distance'],
    actions: ['setCurrLoc', 'setDistance']
  },
  data: {
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
        type: 'gcj02',
        success: res => {
          console.log(res)
          const {latitude, longitude} = res
          this.reportLocation({latitude, longitude})
          this.getRealAddr({latitude, longitude})
          this.calcDistance({latitude, longitude})
          this.randerMap({latitude, longitude})
        }
       })
    },

    // 上报地理位置
    reportLocation ({latitude, longitude}) {
      const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      post({
        url: api.reportLocation + `${driverId}&longitude=${longitude}&latitude=${latitude}`,
        success: res => {
          console.log(res)
        }
      })
    },

    // 获取真实地理信息
    getRealAddr ({latitude, longitude}) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude,
          longitude
        },
        success: ({result}) => {
          // console.log(result)
          const {address} = result
          this.setCurrLoc(address)
        },
        fail: function(error) {
          console.error(error);
        },
      })
    },

    // 计算距离
    calcDistance ({latitude, longitude}) {
      qqmapsdk.calculateDistance({
        mode: 'driving',
        from: {
          latitude,
          longitude
        }, 
        to: [{
          longitude: 116.44355,
          latitude: 39.9219
        }], 
        success: ({result}) => {
          // console.log(result)
          const {distance} = result.elements[0]
          this.setDistance(distance)
        },
        fail: function(error) {
          console.error(error);
        }
      })
    },

    // 渲染地图
    randerMap ({latitude, longitude}) {
      const marker = [{
        id: 111,
        latitude,
        longitude,
        width: '40rpx',
        height: '60rpx'
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
  }
})
