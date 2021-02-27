const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  data: {
    currTab: '',
  },
  computed: {
    orderImg(data) {
      const active = data.currTab === 'order'
      return `../../img/order${active ? '-active' : ''}.png`
    },
    myImg(data){
      const active = data.currTab === 'my'
      return `../../img/my${active ? '-active' : ''}.png`
      // return data.currTab === 'my' ? '' : ''
    }
  },
  created() {
    
  },
  ready() {
    const app = getApp()
    this.setData({
      currTab: app.globalData.activeTabBar
    })
  },
  methods: {
    switchOrderPage () {
      this.setData({ currTab: 'order' })
      const app = getApp()
      app.globalData.activeTabBar = 'order'
      wx.redirectTo({
        url: '/pages/order/index',
      })
    },
    switchMyPage () {
      this.setData({ currTab: 'my' })
      const app = getApp()
      app.globalData.activeTabBar = 'my'
      wx.redirectTo({
        url: '/pages/my/index',
      })
    }
  }
})
