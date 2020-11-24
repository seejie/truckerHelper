// pages/order/index.js
Page({

  data: {
    // currTab: 'order',
    // currTab: 'depart',
    // currTab: 'arrive',
    // currTab: 'queue',
    currTab: 'unload',
    // 发车
    orderId: '121212',
    address: '上海市松江区***',
    arriveTime: '2020-10-19 07:30',
    doubleConfirm: false,
    // 到达
    currLoc: '上海市松江区**街道18号',
    deliverAddr: '上海市松江区**街道18号',
    distance: '600米',
    latitude: 23.099994,
    longitude: 113.324520,
    // 叫号
    queueTime: '2020-10-19 07:00',
    // 卸货
  },

  onLoad (options) {

  },

  // tab切换
  onTabChanged (e) {
    console.log(e)
    const currTab = e.currentTarget.dataset.tab
    console.log(currTab)
    this.setData({ currTab })
  },

  // 扫码
  onscanCode () {
    // todo 一维码还是二维码，提供测试图片
    wx.scanCode({
      onlyFromCamera: true
    }).then(res => {
      console.log('扫码识别成功：', res)
    }).catch(res => {
      console.log('扫码识别失败：', res)
    })
  },

  // 添加订单
  addOrder () {
    this.setData({ currTab: 'depart' })
  },

  // 确认装车
  onConfirmChange () {
    const doubleConfirm = !this.data.doubleConfirm
    this.setData({ doubleConfirm })
  },

  // 确认发车
  ondepart () {
    this.setData({ currTab: 'arrive' })
  },
})
