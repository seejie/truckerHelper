import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['deliverAddr', 'currLoc', 'distance'],
  },
  data: {

  },
  methods: {
   
  }
})
