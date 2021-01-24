import { observable, action } from 'mobx-miniprogram'
import {mock} from '../lib/mock'

const state = {
  user: {},
  sysConfig: [],
  currTab: 'add',
  deliverAddr: {},
  currLoc: '',
  distance: '',
  DockNo: '',
  CheckInTime: '',
  DeliveryNo: '',
}

export const store = observable({
  ...state,
  // ...mock,

  // actions
  setUser: action(function (payload) {
    this.user = payload
  }),
  setSysConfig: action(function (payload) {
    this.sysConfig = payload
  }),
  setCurrTab: action(function (payload) {
    this.currTab = payload
  }),
  setDeliverAddr: action(function (payload) {
    this.deliverAddr = payload
  }),
  setCurrLoc: action(function (payload) {
    this.currLoc = payload
  }),
  setDistance: action(function (payload) {
    if (payload >= 1000) {
      this.distance = (payload / 1000).toFixed(1) + ' 公里'
    } else {
      this.distance = payload + ' 米'
    }
  }),
  setDockNo: action(function (payload) {
    this.DockNo = payload
  }),
  setCheckInTime: action(function (payload) {
    this.CheckInTime = payload
  }),
  setDeliveryNo: action(function (payload) {
    this.DeliveryNo = payload
  }),
})
