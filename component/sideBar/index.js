const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  data: {
    currTab: 'order'
  },
  computed: {
    orderImg(data) {
      const active = data.currTab === 'order'
      return `../../img/order${active ? '-active' : ''}.png`
    },
    myImg(data){
      return data.currTab === 'my' ? '' : ''
    }
  },
  methods: {
    switchOrderPage () {
      this.setData({ currTab: 'order' })
      wx.redirectTo({
        url: '/pages/order/index',
      })
    },
    switchMyPage () {
      this.setData({ currTab: 'my' })
      wx.redirectTo({
        url: '/pages/my/index',
      })
    }
  }
})
