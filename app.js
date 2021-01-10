App({

  globalData: {
    userInfo: null
  },

  onLaunch () {
    // this.debug()
    this.userLogin()
  },

  debug () {
    wx.setEnableDebug({
      enableDebug: true,
    }).catch(res => {
      // console.log(res)
    })
  },

  // 用户登录
  userLogin () {
    wx.login()
      .then(res => {
        console.log('用户登录成功：', res)
        this.getUserPhoneNumber()
        this.getUserAuthSetting()
      }).catch(res => {
        console.log('用户登录失败：', res)
      })
  },

  // 获取用户手机号
  getUserPhoneNumber () {
    // todo 点击button
    
  },

  // 获取用户授权信息
  getUserAuthSetting () {
    wx.getSetting({
      withSubscriptions: true
    }).then(res => {
      console.log('获取用户已授权信息成功：', res)
      const { authSetting: auth,  subscriptionsSetting: authMsg} = res
      
      // 个人信息
      if (auth['scope.userInfo']) {
        this.getUserInfo()
      } else {
        this.requestUserInfo()
      }

      // 位置信息
      if (auth['scope.userLocation']) {
        this.getUserLocation()
      } else {
        this.requestUserLocation()
      }

      // 消息订阅信息
      if (authMsg.mainSwitch) {
        this.requestAuthMsg()
      } else {
        this.openUserAuthSetting()
      }

      }).catch(res => {
        console.log('获取用户已授权信息失败：', res)
      })
  },

  // 获取用户信息
  getUserInfo () {
    wx.getUserInfo()
      .then(res => {
        console.log('获取用户信息成功：', res)
      }).catch(res => {
        console.log('获取用户信息失败：', res)
      })
  },

  // 请求用户授权个人信息
  requestUserLocation () {
    // todo 点击button
    wx.authorize({
      scope: 'scope.userLocation'
    }).then(res => {
      console.log('请求用户授权个人信息成功：', res)
    }).catch(res => {
      console.log('请求用户授权个人信息失败：', res)
    })
  },

  // 获取用户位置信息
  getUserLocation () {
    wx.getLocation()
      .then(res => {
        console.log('获取用户位置信息成功：', res)
      }).catch(res => {
        console.log('获取用户位置信息失败：', res)
      })
  },

  // 请求用户授权位置信息
  requestUserInfo () {
    // todo 点击button
    wx.authorize({
      scope: 'scope.userInfo'
    }).then(res => {
      console.log('请求用户授权成功：', res)
    }).catch(res => {
      console.log('请求用户授权失败：', res)
    })
  },

  // 请求用户授权订阅消息
  requestAuthMsg () {
    // todo 模板id
    // todo 点击button 
    wx.requestSubscribeMessage({
      tmplIds: ['']
    }).then(res => {
      console.log('用户授权订阅消息成功：', res)
    }).catch(res => { 
      console.log('用户授权订阅消息失败：', res)
    })
  },

  // 打开用户授权设置页面
  openUserAuthSetting () {
    wx.openSetting({
      withSubscriptions: true
    }).then(res => {
      console.log('打开授权设置页面成功：', res)
    }).catch(res => {
      console.log('打开授权设置页面失败：', res)
    })
  },

})
