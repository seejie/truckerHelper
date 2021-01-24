import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  // user: {},
  user: {
    DeliveryOrderNo: null,
    DriverName: "Driver",
    ExamStatus: "0",
    Id: "ceb0c206dd074320bbafce6903430f43",
    IdCard: "188888888888888888",
    IsLocked: "0",
    IsValid: "1",
    LastExamScore: "",
    LastExamTime: "",
    LastLoginTime: "",
    Mobile: "16688888888",
    NeedExam: "1",
    PlateNumber: "",
    WXAvatarUrl: "",
    WXNickName: ""
  },
  // sysConfig: [],
  sysConfig: [{"config_id":"10","category":"ExamPeriod","category_name":"考试有效期配置","key_name":"20","description":"考试有效期(单位：天)","is_valid":"1","create_user":"Admin","create_time":"2021-01-16T11:23:44","last_update_user":"Admin","last_update_time":"2021-01-16T12:16:17"},{"config_id":"11","category":"BindDeliveryNote","category_name":"转运配送单","key_name":"1,2,3","description":"当配送单转运时，只有指定状态的配送单才允许转运","is_valid":"1","create_user":"Admin","create_time":"2021-01-16T14:08:54","last_update_user":"Admin","last_update_time":"2021-01-16T14:08:54"},{"config_id":"12","category":"ExamPassScore","category_name":"考试通过分数","key_name":"80","description":"考试通过的得分","is_valid":"1","create_user":"Admin","create_time":"2021-01-16T16:41:17","last_update_user":"Admin","last_update_time":"2021-01-16T16:41:17"},{"config_id":"13","category":"ArriveRange","category_name":"到达距离阈值","key_name":"1000","description":"距离到达地点的位置范围（单位：米）","is_valid":"1","create_user":"Admin","create_time":"2021-01-18T00:09:46","last_update_user":"Admin","last_update_time":"2021-01-18T00:09:46"},{"config_id":"14","category":"IntervalRefreshGPS","category_name":"刷新GPS控制","key_name":"60","description":"GPS上传时间间隔（单位：秒）","is_valid":"1","create_user":"Admin","create_time":"2021-01-18T00:13:10","last_update_user":"Admin","last_update_time":"2021-01-18T00:13:10"},{"config_id":"15","category":"IntervalRefreshOrder","category_name":"刷新订单状态控制","key_name":"60","description":"刷新订单状态时间间隔（单位：秒）","is_valid":"1","create_user":"Admin","create_time":"2021-01-18T00:13:18","last_update_user":"Admin","last_update_time":"2021-01-18T00:13:18"},{"config_id":"7","category":"AuthExpired","category_name":"授权有效时间","key_name":"60","description":"授权有效时间（单位：分钟）","is_valid":"1","create_user":"Admin","create_time":"2020-12-26T15:30:54","last_update_user":"Admin","last_update_time":"2020-12-26T15:30:54"},{"config_id":"8","category":"LT","category_name":"在途时间","key_name":"4","description":"4天","is_valid":"1","create_user":"Admin","create_time":"2021-01-05T13:49:04","last_update_user":"Admin","last_update_time":"2021-01-05T13:49:04"}],
  currTab: 'add',
  // currTab: 'depart',
  // currTab: 'arrive',
  // currTab: 'queue',
  // currTab: 'unload',
  // deliverAddr: {},
  deliverAddr: {
    Address: "QT",
    Code: "U",
    Latitude: 31.249162,
    Longitude: 121.487899,
    Name: "联合利华天津厂"
  },
  currLoc: '',
  distance: '',
  DockNo: '',
  CheckInTime: '',
  // DeliveryNo: '',
  DeliveryNo: '2110003350510107',

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
