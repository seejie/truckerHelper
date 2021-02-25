import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { toast } from '../../lib/utils'
import { store } from '../../store/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user']
  },
  data: {
    checked: false
  },

  onChange () {
    const bool = this.data.checked
    this.setData({checked: !bool})
  },

  // 下一步
  nextStep () {
    if (!this.data.checked) return toast('请滑动到底部，并勾选我已阅读！')

    const {NeedExam, ExamStatus} = this.data.user
    let url
    // NeedExam：0不需要考试，1需要；ExamStatus：1考试状态有效，0无效
    // todo
    if (NeedExam === '0' && ExamStatus === '1') {
    // if (false) {
      url = '/pages/order/index'
    } else {
      url = '/pages/notTest/index'
    }
    wx.redirectTo({url})
  }
})

// todo协议
// 欢迎您使用联合利华为物流司机人员提供的专享服务系统《U家大数据送货平台》。本协议是由用户（以下可称“用户”或“您”）与我司就所提供的产品及服务所订立的协议。为保障您的权益，请您在登录使用我司所提供的产品及服务之前，仔细阅读本协议，包括免除或者限制我司的免责条款及对用户的权利限制条款。如果您进入我司或用户登录页面，确认已经阅读、同意本协议的条款并完成登录，或者通过其他任何方式获得和使用我司所提供的产品和服务，则视为您已经详细阅读了本协议的内容，同意遵守本协议的约定。您不应再以不了解本协议内容为由拒绝履行本协议。此外，我司有权在不另行通知的情况下，随时对本协议或相关协议进行修改，修改部分即时生效并适用。请您在使用产品和服务时进行关注并遵守，如您不同意修改，您可以随时停止使用；如果您继续使用，则视为您已经接受修改后的协议。