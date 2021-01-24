import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'
import {post} from '../../../../api/methods'
import {api} from '../../../../api/index'

Component({ 
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user']
  },
  data: {
    currTab: 'order'
  },
  methods: {
    // 添加订单
    addOrder () {
      this.triggerEvent('tabChaned', {currTab: 'depart'}, {})
      const {Id} = this.data.user
      const deliveryNo = '2110003350510107'
      post({
        url: api.submitOrder + Id + `&deliveryNo=${deliveryNo}`,
        success: res => {
          // console.log(res)
          this.triggerEvent('tabChaned', {currTab: 'depart'}, {})
        }
      })
    },
  }
})
