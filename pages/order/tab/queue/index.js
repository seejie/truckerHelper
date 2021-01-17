import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../../store/index'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['deliverAddr'],
  },
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
  },
  methods: {
   
  }
})
