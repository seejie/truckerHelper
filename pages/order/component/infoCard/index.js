const computedBehavior = require('miniprogram-computed')
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'

Component({
  behaviors: [computedBehavior, storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      currOrder: () => store.currOrder
    }
  },
  computed: {
    orderInfo (data) {
      return data.currOrder
    }
  },
  methods: {
    init() {
      console.log(this.data)
    }
  }
})
