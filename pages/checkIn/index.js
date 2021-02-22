import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'
import {post} from '../../api/methods'
import {api} from '../../api/index'
import { toast } from '../../lib/utils'
import {tmpId, tmp2Id, tmp3Id, tmp4Id} from '../../lib/constant'
console.log(tmpId)
Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user'],
    actions: ['toggleShowKeyboard']
  },
  data: {
    carNum: [],
    name: '',
    tel: '',
    idCard: '',
    tourCode: [],
    healthCode: [],
    focusIdx: 7
  },

  onReady () {

    // wx.showModal({
    //   title: '温馨提示',
    //   content: '为更好体验服务',
    //   confirmText:"同意",
    //   cancelText:"拒绝",
    //   success (res) {
    //     if (!res.confirm)  return
    //     wx.requestSubscribeMessage({
    //       // tmplIds: [tmpId, tmp2Id, tmp3Id, tmp4Id],
    //       tmplIds: [tmpId, tmp2Id, tmp3Id],
    //       success (res) { 
    //         console.log('授权订阅消息成功：', res)
    //       },
    //       fail (res) {
    //         console.log('授权订阅消息失败：', res)
    //       }
    //     })
    //   }
    // })

    // wx.showModal({
    //   title: '温馨提示',
    //   content: '为更好体验服务',
    //   confirmText:"同意",
    //   cancelText:"拒绝",
    //   success (res) {
    //     if (!res.confirm)  return
    //     wx.requestSubscribeMessage({
    //       // tmplIds: [tmpId, tmp2Id, tmp3Id, tmp4Id],
    //       tmplIds: [tmp4Id],
    //       success (res) { 
    //         console.log('授权订阅消息成功：', res)
    //       },
    //       fail (res) {
    //         console.log('授权订阅消息失败：', res)
    //       }
    //     })
    //   }
    // })

    const {IdCard, Mobile, PlateNumber, DriverName} = this.data.user
    console.log(this.data.user)
    this.setData({
      name: DriverName || '',
      tel: Mobile || '',
      idCard: IdCard || '',
      carNum: PlateNumber ? PlateNumber.split('') : ['', '', '', '', '', '', '']
    })
  },

  onfocus (e) {
    console.log(1)
    this.toggleShowKeyboard(true)
    const {detail: {value: val}} = e
    const carNum = this.data.carNum
    // 如果没有值
    if (!val) {
      const focusIdx = carNum.findIndex(el => !el)
      this.setData({focusIdx})
    }
  },

  // 输入车牌号
  onCarNumChanged (e) {
    const {detail: {value: val}, target: {dataset: {idx}}} = e
    const carNum = this.data.carNum
    carNum[+idx] = val
    // 如果没有值
    if (!val) {
      this.setData({carNum, focusIdx: +idx})
    } else {
      this.setData({carNum, focusIdx: +idx + 1})
    }
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
    const {name, tel, idCard, carNum, user: {Id}, tourCode, healthCode} = this.data
    // console.log(tel)
    // console.log(idCard)
    if (!tel.trim()) return toast('手机号必填')
    if (!/^1[0-9]{10}$/.test(tel)) return toast('无效手机号，请检查后重新填写~')
    if (!idCard.trim()) return toast('身份证必填')
    if (!/\d{17}(\d|X|x)/.test(idCard)) return toast('无效身份证号，请检查后重新填写~')

    if (!tourCode.length) return toast('请上传行程码截图~')
    if (!healthCode.length) return toast('请上传健康码截图~')

    post({
      url: api.submitUserInfo,
      data: {
        Id,
        DriverName: name,
        IdCard: idCard,
        Mobile: tel,
        PlateNumber: carNum.join(''),
        HealthCode: healthCode[0].url,
        TourCode: tourCode[0].url
      },
      success: res => {
        // console.log(res)
        this.authSetting()
      }
    })
  },

  // 查询用户是否订阅消息
  authSetting () {
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        // console.log(res)
        const {subscriptionsSetting: {itemSettings, mainSwitch}} = res
        console.log(res)
        console.log(mainSwitch)
        console.log(itemSettings && itemSettings[tmpId])
        !mainSwitch && this.openUserAuthSetting()
        this.jump2next()
      },
      fail: err => {
        console.log(err)
        this.subscribeMessage()
      }
    })
  },

  // 打开用户授权设置页面
  openUserAuthSetting () {
    wx.openSetting({
      withSubscriptions: true
    }).then(res => {
      // console.log('打开授权设置页面成功：', res)
    }).catch(res => {
      // console.log('打开授权设置页面失败：', res)
    })
  },

  // 订阅消息
  subscribeMessage () {
    wx.showModal({
      title: '温馨提示',
      content: '为了更及时的获得配送过程中的消息通知，请您同意以下订阅消息通知!',
      confirmText:"同意",
      cancelText:"拒绝",
      success (res) {
        if (!res.confirm)  return
        wx.requestSubscribeMessage({
          // tmplIds: [tmpId, tmp2Id, tmp3Id, tmp4Id],
          tmplIds: [tmpId, tmp2Id, tmp3Id],
          success (res) { 
            console.log('授权订阅消息成功：', res)
            this.jump2next()
          },
          fail (res) {
            console.log('授权订阅消息失败：', res)
            this.jump2next()
          }
        })
      }
    })
  },

  // 跳转承诺书
  jump2next () {
    wx.redirectTo({
      url: '/pages/promise/index',
    })
  },

  // 删除预览图片
  delCurrImg (event) {
    const {currentTarget: {dataset: {key}}} = event
    const type = `${key}Code`
    this.setData({[type]: []})
  },

  // 文件上传
  afterRead (event) {
    // const { file } = event.detail;
    const {detail: {file}, currentTarget: {dataset: {key}}} = event
    // console.log(key)
    wx.getFileSystemManager().readFile({
      filePath: file.url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        const base64 = res.data
        const handle = 'data:image/png;base64,'
        // console.log('base64：', base64) 
        post({
          url: api.uploadImg,
          data: {
            Image: handle + base64
          },
          success: res => {
            const type = `${key}Code`
            this.setData({[type]: [{url: res.imageAdress}]})
          }
        })
      }
    })
  },

})
