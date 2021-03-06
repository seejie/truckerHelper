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
  // 显示虚拟键盘
  showKeyboard: false,
  OrderStatus: '',
  stopReportLoc: false,
  stopCheckStatus: false,
}

export const store = observable({
  ...state,
  // todo
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
  toggleShowKeyboard: action(function (payload) {
    this.showKeyboard = payload
  }),
  setOrderStatus: action(function (payload) {
    this.OrderStatus = payload
  }),
  setStopReportLoc: action(function (payload) {
    this.stopReportLoc = payload
  }),
  setStopCheckStatus: action(function (payload) {
    this.stopCheckStatus = payload
  }),
})
