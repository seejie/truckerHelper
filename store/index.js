import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  currOrder: [],

  // getters
  get getCurrOrder() {
    return this.currOrder
  },

  // actions
  setCurrOrder: action(function (payload) {
    console.log(payload, 999)
    this.currOrder = payload
  })
})
