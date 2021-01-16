import {post} from '../../api/methods'
import {api} from '../../api/index'
import {guid} from '../../utils/util'

const app = getApp()
Page({
  data: {
    questions: []
  },

  onLoad () {
    this.getQuestions()
  },

  // 获取考题
  getQuestions () {
    const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
    post({
      url: api.getExamData + driverId,
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
    console.log(this.data.questions, 111)
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
    score = 80
    console.log(score)

    const config = app.globalData.sysConfig.find(el=> el.category === 'ExamPassScore')
    const date = new Date()
    date.setDate(date.getDate() + 10)
    const exp = date.toLocaleDateString().replace(/\//g, '-')
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
      success (res) {
        if (!res.confirm) return
        questions.forEach(el => delete el.selected)

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

        const now = new Date().format('yyyy-MM-dd HH:mm:ss')
        const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
        const data = {
          ScoreId: guid().replace(/\-/g, ''),
          DriverId: driverId,
          WXOpenId: "小程序OpenId",
          ExamTime: now,
          TotalScore: score,
          IsPassing: isPass ? 1 : 0,
          Questions: questions
        }

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
  }
})
