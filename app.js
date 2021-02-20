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
  }
})
