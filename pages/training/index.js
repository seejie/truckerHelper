import {post} from '../../api/methods'
import {api} from '../../api/index'

Page({
  data: {
    questions: []
  },

  onLoad () {
    this.getQuestions()
  },

  // 获得题目
  getQuestions () {
    const driverId = '130c81313a3c44a6a57bd0f6158cdb90'
    post({
      url: api.getTrainingData + driverId,
      success: res => {
        console.log(res.View)
        const questions = res.View.map(el => {
          console.log(el)
          const answer = el.AnswerList.find(item => item => item.IsCorrect)
          el.answer = answer.Answer
          return el
        })
        this.setData({questions})
      }
    })
  },

  // 开始考试
  onExam () {
    wx.redirectTo({
      url: '/pages/exam/index',
    })
  }
})