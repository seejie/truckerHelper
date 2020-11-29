const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  properties: {
    currTab: String
  },
  computed: {
    orderImg(data) {
      const active = data.currTab === 'order'
      const src = data.currTab === 'order' ? '../../img/order.png' : ''
      return `../../img/order${active ? '-active' : ''}.png`
    },
    myImg(data){
      return data.currTab === 'my' ? '' : ''
    }
  },
  methods: {
    // 切换tab
    switchTab (e) {
      const currTab = e.currentTarget.dataset.key
      this.triggerEvent('tabChaned', {currTab}, {})
    }
  }
})
