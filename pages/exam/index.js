import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'
import {post} from '../../api/methods'
import {api} from '../../api/index'
import {guid} from '../../lib/utils'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user', 'sysConfig']
  },
  data: {
    questions: []
  },

  onLoad () {
    this.getQuestions()
    this.initFun()
  },

  // 获取考题
  getQuestions () {
    const {Id} = this.data.user
    post({
      url: api.getExamData + Id,
      success: res => {
        console.log(res.View)
        const questions = res.View.map(el => {
          el.selected = ''
          return el
        })
        this.setData({questions})
      }
    })
  },

  // 结束考试
  onSubmit () {
    // console.log(this.data.questions)
    const {questions} = this.data
    let score = 0
    questions.forEach(el => {
      const {AnswerList, selected} = el
      const obj = AnswerList[selected]
      if (selected === '') return
      const {IsCorrect, AnswerValue} = obj
      if (!IsCorrect) return
      score+=AnswerValue
    })

    const config = this.data.sysConfig.find(el=> el.category === 'ExamPassScore')
    const date = new Date()
    date.setDate(date.getDate() + 10)
    const exp = date.format('yyyy/MM/dd')
    let msg, title, url
    const isPass = score >= +config.key_name

    if (isPass) {
      msg = `您本次考试得分 ${score} ，恭喜通过！本次考试成绩有效期 10 天，有效期截止日期 ${exp}`
      title = '恭喜通过'
      url = '/pages/order/index'
    } else {
      msg = `你本次考试${score}分，不通过。无法进行进一步操作。请重新观看培训视频进行考试！`
      title = '不通过'
      url = '/pages/training/index'
    }

    wx.showModal({
      title,
      content: msg,
      showCancel: false,
      success: res => {
        if (!res.confirm) return
        questions.forEach(el => delete el.selected)

        const now = new Date().format('yyyy-MM-dd HH:mm:ss')
        const {Id} = this.data.user

        const data = {
          ScoreId: guid().replace(/\-/g, ''),
          DriverId: Id,
          ExamTime: now,
          TotalScore: score,
          IsPassing: isPass ? 1 : 0,
          Questions: questions
        }
        console.log(data)
        return
        post({
          url: api.submitAnswer,
          data,
          success: res => {
            wx.redirectTo({url})
          }
        })
      }
    })
  },

  // 回到
  onAnswer (e) {
    const idx = e.currentTarget.dataset.idx
    const val = e.detail
    const {questions} = this.data
    questions[idx].selected = val
    this.setData({questions})
  },

  initFun () {
    Date.prototype.format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "H+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  }
})
