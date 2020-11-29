const computedBehavior = require('miniprogram-computed')
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'

Component({
  behaviors: [computedBehavior],
  data: {
    currTab: 'order'
  },
  computed: {
    
  },
  attached () {
    this.initStore()
  },
  methods: {
    // 初始化store
    initStore () {
      this.storeBindings = createStoreBindings(this, {
        store,
        actions: ['setCurrOrder']
      })
    },

    // 添加订单
    addOrder () {
      this.setCurrOrder([{
        label: '订单编号',
        value: '121212'
      }, {
        label: '送货地址',
        value: '上海市松江区***'
      }, {
        label: '要求到达时间',
        value: '2020-10-19 07:30'
      }])
      this.triggerEvent('tabChaned', {currTab: 'depart'}, {})
    },
  }
})
