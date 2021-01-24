import { toast } from "../lib/utils"

const request = () => {}
const errHandle = () => {}

export const get = options => {
  const {url, data, success, fail} = options
  wx.request({
    url,
    data,
    // header: {
    //   'content-type': 'application/json' // 默认值
    // },
    success (res) {
      // console.log(res)
      if (res.statusCode !== 200) return
      success && success(res.data)
    },
    fail (err) {
      console.error(err)
      fail && fail(err)
    }
  })
}

export const post = options => {
  const {url, data, success, fail} = options
  wx.request({
    url,
    method: 'POST',
    data,
    success (res) {
      // console.log(res)
      const {statusCode, data} = res
      if (statusCode !== 200) return
      const {ResultType, Message, ReturnObject} = data
      if (ResultType !== '0') return toast(Message || '未知错误，请重试~')
      success && success(ReturnObject)
    },
    fail (err) {
      console.error(err)
      fail && fail(err)
    }
  })
}
