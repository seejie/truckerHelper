import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/index'
import {post} from '../../api/methods'
import {api} from '../../api/index'

Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['user']
  },
  data: {
    questions: []
  },

  onLoad () {
    this.getQuestions()
  },

  // 获得题目
  getQuestions () {
    const {Id} = this.data.user
    post({
      url: api.getTrainingData + Id,
      success: res => {
        // console.log(res.View)
        const questions = res.View.map(el => {
          const answer = el.AnswerList.find(item => item.IsCorrect === '1')
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
      url: '/pages/beforeExam/index',
      // url: '/pages/exam/index',
    })
  }
})