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
      console.log(res.data)
      success(res)
    },
    fail (err) {
      console.error(err)
      fail(err)
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
      console.log(res.data)
      success(res)
    },
    fail (err) {
      console.error(err)
      fail(err)
    }
  })
}
