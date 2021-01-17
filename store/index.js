import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  deliverAddr: '',
  currLoc: '',
  distance: '',

  // actions
  setDeliverAddr: action(function (payload) {
    this.deliverAddr = payload
  }),
  setCurrLoc: action(function (payload) {
    this.currLoc = payload
  }),
  setDistance: action(function (payload) {
    this.distance = payload + ' 米'
  })
})
