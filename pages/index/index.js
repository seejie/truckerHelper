import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'
import { post } from '../../api/methods'
import { api } from '../../api/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    actions: ['setUser', 'setSysConfig', 'setCurrTab', 'setDeliveryNo']
  },
  data: {
    needUserAuth: false,
  },

  onLoad() {
    this.userLogin()
  },

  tipAgree: function () {
    this.setData({
      isAgree: false
    })
  },

  // 用户登录
  userLogin() {
    wx.showLoading({ mask: true })
    wx.login({
      success: res => {
        // console.log('用户登录成功：', res.code)
        this.login(res.code)
      },
      fail: res => {
        console.log('用户登录失败：', res)
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  // 登录验证
  login(code) {
    post({
      url: api.loginSys + code,
      success: res => {
        const user = res.view
        this.setUser(user)
        console.log('用户信息：', user)
        const {DeliveryOrderNo} = user
        // todo
        if (!DeliveryOrderNo) {
        // if (true) {
          this.getSysConfig(user.Id)
          this.setData({ needUserAuth: !user.Mobile })
        } else {
          this.getSysConfig(user.Id)
          this.getOrderInfo(user.Id, DeliveryOrderNo)
        }
      }
    })
  },

  getOrderInfo (Id, DeliveryNo) {
    wx.showLoading({ mask: true })
    post({
      url: api.getOrderInfo + Id + `&deliveryNo=${DeliveryNo}`,
      success: res => {
        console.log('订单状态：', res.view)
        const {OrderStatus} = res.view

        let currTab
        switch (OrderStatus) {
          // 未到达
          case '1': 
            currTab = 'depart'
            break
          case '2': 
            currTab = 'arrive'
            break
          case '3': 
            currTab = 'queue'
            break
          case '4': case '5': case '6': case '7': case '8': 
            currTab = 'queue'
            break
        }

        this.setDeliveryNo(DeliveryNo)
        this.setCurrTab(currTab)
        wx.redirectTo({ url: '/pages/order/index' })
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  },

  // 获取系统配置
  getSysConfig(id) {
    post({
      url: api.sysConfig + id,
      success: res => {
        // console.log('系统配置：', res.view)
        this.setSysConfig(res.view)
      }
    })
  },

  // 新用户，申请用户授权电话信息
  getPhoneNumber(e) {
    const { detail: { iv, encryptedData } } = e
    // console.log(e)
    // console.log(e.detail.errMsg)
    if (e.detail.errMsg.includes('deny')) {
      this.jump2Next()
      return
    }
    console.log(iv)
    console.log(encryptedData)

    post({
      url: api.getUserRealInfo,
      data: {
        iv,
        encryptedData
      },
      success: res => {
        console.log(res)
        this.jump2Next()
      },
      fail: err => {
        this.jump2Next()
      }
    })
  },

  jump2Next() {
    wx.redirectTo({
      url: '/pages/checkIn/index',
    })
  }
})
