const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  data: {
    doubleConfirm: false,
  },
  computed: {

  },
  methods: {
    // 确认装车
    onConfirmChange () {
      const doubleConfirm = !this.data.doubleConfirm
      this.setData({ doubleConfirm })
    },

    // 确认发车
    ondepart () {
      this.triggerEvent('tabChaned', {currTab: 'arrive'}, {})
    },
  }
})
