import config from '../config.js'
const BASE_URL = config.baseUrl

// 通用请求方法封装
export const request = (options) => {
  const token = uni.getStorageSync('token') || ''

  return new Promise((resolve, reject) => {
    // 是否显示 loading
    if (!options.hideLoading) {
      uni.showLoading({ title: '加载中...', mask: true })
    }

    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...options.header
      },
      success: (res) => {
        // 根据后端返回结构统一处理
        if (res.statusCode === 200) {
          const { code, data, msg } = res.data

          // 成功返回
          if (code === 0 || code === 200) {
            resolve(data)
          } else if (code === 401) {
            // token 过期处理
            uni.removeStorageSync('token')
            uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
            setTimeout(() => {
              uni.reLaunch({ url: '/pages/login/login' })
            }, 1000)
            reject(res.data)
          } else {
            uni.showToast({ title: msg || '请求错误', icon: 'none' })
            reject(res.data)
          }
        } else {
          uni.showToast({ title: '服务器错误', icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常，请稍后再试', icon: 'none' })
        reject(err)
      },
      complete: () => {
        if (!options.hideLoading) {
          uni.hideLoading()
        }
      }
    })
  })
}
