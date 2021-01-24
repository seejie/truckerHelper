App({

  onLaunch () {
    this.debug()
    // this.getUserAuthSetting()
  },

  debug () {
    wx.setEnableDebug({
      enableDebug: true,
    }).catch(res => {
      // console.log(res)
    })
  },

  // 获取用户授权信息
  getUserAuthSetting () {
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        // console.log(res)
        const { authSetting: auth,  subscriptionsSetting: authMsg} = res
        // 位置信息
        if (auth['scope.userLocation']) {
          // this.getUserLocation()
        } else {
          // this.requestUserLocation()
        }

        // 消息订阅信息
        if (authMsg.mainSwitch) {
          // this.requestAuthMsg()
        } else {
          // this.openUserAuthSetting()
        }
      },
      fail: err => {
        // console.log('获取用户已授权信息失败：', err)
      }
    })
  },

  // 请求用户授权个人信息
  requestUserLocation () {
    wx.authorize({
      scope: 'scope.userLocation'
    }).then(res => {
      // console.log('请求用户授权个人信息成功：', res)
    }).catch(res => {
      // console.log('请求用户授权个人信息失败：', res)
    })
  },

  // 获取用户位置信息
  getUserLocation () {
    wx.getLocation()
      .then(res => {
        // console.log('获取用户位置信息成功：', res)
      }).catch(res => {
        // console.log('获取用户位置信息失败：', res)
      })
  },

  // 请求用户授权订阅消息
  requestAuthMsg () {
    // todo 模板id
    wx.requestSubscribeMessage({
      tmplIds: ['']
    }).then(res => {
      // console.log('用户授权订阅消息成功：', res)
    }).catch(res => { 
      // console.log('用户授权订阅消息失败：', res)
    })
  },

  // 打开用户授权设置页面
  openUserAuthSetting () {
    wx.openSetting({
      withSubscriptions: true
    }).then(res => {
      // console.log('打开授权设置页面成功：', res)
    }).catch(res => {
      // console.log('打开授权设置页面失败：', res)
    })
  },
})
