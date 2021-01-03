Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum: ['', '', '', '', '', '', ''],
    tel: '',
    idCard: '',
    travelCodeImgs: [],
    healthCodeImgs: [],
    focusIdx: 0
  },

  onLoad (options) {

  },

  onfocus (e) {
    const {target: {dataset: {idx}}} = e
    // console.log(idx)
    const arr = this.data.carNum
    const i = arr.findIndex(el => !el)
    // console.log(arr)
    // console.log(i)
    const query = wx.createSelectorQuery()
    const a = query.select('input.box').fields({
      focus: true
    }).exec()
    console.log(a)
  },

  // 输入车牌号
  onCarNumChanged (e) {
    const {detail: {value: val}, target: {dataset: {idx}}} = e
    const carNum = this.data.carNum
    const i = carNum.findIndex(el => !el)
    if (+idx > i) return
    carNum[+idx] = val
    this.setData({carNum})
    this.setData({focusIdx: this.data.focusIdx + 1})
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

  // 保存
  onsubmit () {
    const {tel, idCard} = this.data
    console.log(tel)
    console.log(idCard)
    if (!tel.trim()) return this.showErrMsg('手机号必填')
    if (!/^1[0-9]{10}$/.test(tel)) return this.showErrMsg('无效手机号，请检查后重新填写~') 
    if (!idCard.trim()) return this.showErrMsg('身份证必填')
    if (!/\d{17}(\d|X|x)/.test(idCard)) return this.showErrMsg('无效身份证号，请检查后重新填写~')

    return
    wx.redirectTo({
      url: '/pages/promise/index',
      // url: '/pages/notTest/index',
      // url: '/pages/training/index',
    })
  },

  showErrMsg (txt) {
    wx.showToast({
      title: txt,
      icon: 'none',
      duration: 2000
    })
  }
})
