import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'

Component({
  data: {
    currTab: 'order'
  },
  methods: {
    // 添加订单
    addOrder () {
      this.triggerEvent('tabChaned', {currTab: 'depart'}, {})
      const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
      const deliveryNo = '21100006Supplier001'
      post({
        url: api.submitOrder + driverId + `&deliveryNo=${deliveryNo}`,
        success: res => {
          // console.log(res)
          this.triggerEvent('tabChaned', {currTab: 'depart'}, {})
        }
      })
    },
  }
})
