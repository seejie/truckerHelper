import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'
const computedBehavior = require('miniprogram-computed')
const QQMapWX = require('../../../../lib/qqmap-wx-jssdk');
const qqmapsdk = new QQMapWX({
  key: 'TCEBZ-3TKRI-REAGV-5575O-W7DJ7-AMFEE'
})

Component({
  behaviors: [storeBindingsBehavior, computedBehavior],
  storeBindings: {
    store,
    fields: ['user', 'currTab', 'sysConfig', 'deliverAddr', 'currLoc', 'distance', 'stopReportLoc'],
    actions: ['setCurrLoc', 'setDistance', 'setStopReportLoc']
  },
  data: {
    latitude: undefined,
    longitude: undefined,
    marker: {},
    circle: {},
    showMap: false
  },
  watch: {
    currTab: function(tab) {
      if (tab !== 'arrive') return
      this.getCurrLocation()
      this.recordLocation()
    },
  },

  methods: {
    // 获取当前位置
    getCurrLocation () {
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          // console.log(res)
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
      const {user: {Id}, sysConfig} = this.data
      const config = sysConfig.find(el => el.category === 'IntervalRefreshGPS')
      const frequency = config.key_name
      console.log('上报间隔：', frequency)

      let timer = null
      const request = () => {
        if (this.stopReportLoc) {
          clearInterval(timer)
          return
        }

        post({
          url: api.reportLocation + `${Id}&longitude=${longitude}&latitude=${latitude}`,
          success: res => {
            // console.log(res)
            console.log('上报位置：', new Date())
          }
        })
      }

      request()
      timer = setInterval(request, +frequency * 1000)
      this.setStopReportLoc(false)
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
      const {deliverAddr: {Longitude, Latitude}} = this.data

      qqmapsdk.calculateDistance({
        mode: 'driving',
        from: {
          latitude,
          longitude
        }, 
        to: [{
          longitude: Longitude,
          latitude: Latitude
        }], 
        success: ({result}) => {
          // console.log(result)
          const {distance} = result.elements[0]
          this.setDistance(distance)
          const {sysConfig} = this.data
          const config = sysConfig.find(el => el.category === 'ArriveRange')
          const threshold = config.key_name
    
          // todo
          // setTimeout(() =>{
          //   this.triggerEvent('tabChaned', {currTab: 'queue'}, {})
          // }, 3000)
          if (distance >= +threshold) return 
          this.triggerEvent('tabChaned', {currTab: 'queue'}, {})
        },
        fail: function(error) {
          console.error(error);
        }
      })
    },

    // 渲染地图
    randerMap ({latitude, longitude}) {
      const {marker, circle} = this.calcMarkerAndCircle({latitude, longitude})
      this.setData({
        marker,
        latitude,
        longitude,
        showMap: true,
        circle
      })
    },

    // 计算marker和circle
    calcMarkerAndCircle ({latitude, longitude}) {
      const marker = [{
        id: 111,
        latitude,
        longitude,
      }]

      const circle = [{
        latitude,
        longitude,
        color: '#FF0000DD',
        fillColor: '#7cb5ec88',
        radius: 100,
        strokeWidth: 2
      }]

      return {marker, circle}
    },

    // 开启后台上报
    recordLocation () {
      wx.startLocationUpdateBackground({
        success: res => {
          // console.log(res)
          this.onUserLocationChanged()
        },
        fail: err => {
          // console.log(err)
          this.requestUserAuth()
        }
      })
    },

    // 引导用户授权后台上报位置
    requestUserAuth () {
      // todo
      // return
      wx.showModal({
        title: '温馨提示',
        content: '请您开启使用小程序期间和离开小程序后，均可检测位置信息~',
        confirmText:"同意",
        cancelText:"拒绝",
        success: res => {
          if (!res.confirm)  return
          wx.openSetting({
            success: res => {
              console.log(res)
              this.onUserLocationChanged()
            },
            fail: err => {
              console.log(err)
              this.requestUserAuth()
            }
          })
        }
      })
    },

    // 开始监听位置变化
    onUserLocationChanged () {
      wx.onLocationChange(res => {
        console.log('位置改变：上报位置', res)
        const {latitude, longitude} = res
        this.reportLocation({latitude, longitude})
      })
    }
  }
})
