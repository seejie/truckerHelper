import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'
import {post} from '../../api/methods'
import {api} from '../../api/index'
import { toast } from '../../lib/utils'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    actions: ['setUser', 'setSysConfig']
  },
  data: {
    needUserAuth: false
  },

  onLoad () {
    this.userLogin()
  },

  // 用户登录
  userLogin () {
    wx.login({
      success: res => {
        // console.log('用户登录成功：', res.code)
        this.login(res.code)
      },
      fail: res => {
        console.log('用户登录失败：', res)
      }
    })
  },

  // 登录验证
  login (code) {
    post({
      url: api.login + code,
      success: res => {
        // todo
        const user = res.view
        this.setUser(user)
        // console.log('用户信息：', user)
        this.getSysConfig(user.Id)
        this.setData({needUserAuth: !user.Mobile})
      }
    })
  },

  // 获取系统配置
  getSysConfig (id) {
    post({
      url: api.sysConfig + id,
      success: res => {
        // console.log('系统配置：', res.view)
        this.setSysConfig(res.view)
      }
    })
  },

  // 新用户，申请用户授权电话信息
  getPhoneNumber (e) {
    const { detail: { iv, encryptedData} } = e
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

  jump2Next () {
    wx.redirectTo({
      url: '/pages/checkIn/index',
    })
  }
})
