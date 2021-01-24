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
      if (ResultType !== '0') {
        wx.showToast({
          title: Message || '未知错误，请重试~',
          icon: 'none',
          duration: 2000
        })   
        return     
      }
      success && success(ReturnObject)
    },
    fail (err) {
      console.error(err)
      fail && fail(err)
    }
  })
}
