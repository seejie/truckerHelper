import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'
import {post} from '../../api/methods'
import {api} from '../../api/index'
import { toast } from '../../lib/utils'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user']
  },
  data: {
    carNum: ['', '', '', '', '', '', ''],
    name: '',
    tel: '',
    idCard: '',
    travelCodeImgs: [],
    healthCodeImgs: [],
    focusIdx: 0
  },

  onReady () {
    const {IdCard, Mobile, PlateNumber, DriverName} = this.data.user
    this.setData({
      name: DriverName || '',
      tel: Mobile || '',
      idCard: IdCard || '',
      carNum: PlateNumber ? PlateNumber.split('') : []
    })
  },

  onfocus (e) {
    const {target: {dataset: {idx}}} = e
    // console.log(idx)
    const arr = this.data.carNum
    const i = arr.findIndex(el => !el)
    if (i > idx) return
    this.setData({focusIdx: i})
  },

  // 输入车牌号
  onCarNumChanged (e) {
    const {detail: {value: val}, target: {dataset: {idx}}} = e
    const carNum = this.data.carNum
    const i = carNum.findIndex(el => !el)
    if (+idx > i) return
    carNum[+idx] = val
    this.setData({carNum, focusIdx: +idx + 1})
  },

  // 输入手机号
  onTelChanged (e) {
    const tel = e.detail.value
    this.setData({tel})
  },

  // 输入身份证
  onIdCardChanged (e) {
    const idCard = e.detail.value
    this.setData({idCard})
  },

  // 输入姓名
  onNameChanged (e) {
    const name = e.detail.value
    this.setData({name})
  },

  // 保存
  onsubmit () {
    const {name, tel, idCard, carNum, user: {Id}} = this.data
    // console.log(tel)
    // console.log(idCard)
    if (!tel.trim()) return toast('手机号必填')
    if (!/^1[0-9]{10}$/.test(tel)) return toast('无效手机号，请检查后重新填写~')
    if (!idCard.trim()) return toast('身份证必填')
    if (!/\d{17}(\d|X|x)/.test(idCard)) return toast('无效身份证号，请检查后重新填写~')

    post({
      url: api.submitUserInfo,
      data: {
        Id,
        DriverName: name,
        IdCard: idCard,
        Mobile: tel,
        WXOpenId: "小程序OpenId",
        WXNickName: "昵称",
        WXAvatarUrl: "头像链接",
        PlateNumber: carNum.join(''),
      },
      success: res => {
        // console.log(res)
        wx.redirectTo({
          url: '/pages/promise/index',
        })
      }
    })
  },
})
