import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  deliverAddr: '',

  // getters
  get getDeliverAddr() {
    return this.deliverAddr
  },

  // actions
  setDeliverAddr: action(function (payload) {
    this.deliverAddr = payload
  })
})
