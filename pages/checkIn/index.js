Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum: '',
    tel: '',
    idCard: '',
    travelCodeImgs: [],
    healthCodeImgs: []
  },

  onLoad (options) {

  },

  // 输入车牌号
  onCarNumChanged (e) {
    const {detail: {value: val}, target: {dataset: {idx}}} = e
    console.log(e)
    console.log(val)
    console.log(idx)
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
