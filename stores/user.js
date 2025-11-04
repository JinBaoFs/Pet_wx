import { defineStore } from 'pinia'
import { loginByCode } from '@/common/api/user.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    openid: '',
    userInfo: null,
  }),
  actions: {
    async silentLogin() {
      try {
        // 1. 调用 wx.login() 获取 code
        const { code } = await new Promise((resolve, reject) => {
          uni.login({
            success: resolve,
            fail: reject
          })
        })
        console.log('✅ wx.login 获取 code 成功:', code)

        // 2. 请求后端登录接口
        const res = await loginByCode({ code })
        console.log('✅ 后端返回登录结果:', res)

        // 3. 保存 token 和 openid
        this.token = res.token
        this.openid = res.openid
        uni.setStorageSync('token', res.token)
        uni.setStorageSync('openid', res.openid)

        return res
      } catch (err) {
        console.error('❌ 静默登录失败:', err)
        throw err
      }
    },

    // 获取用户资料（需用户授权）
    setUserInfo(info) {
      this.userInfo = info
      uni.setStorageSync('userInfo', info)
    },

    logout() {
      this.token = ''
      this.openid = ''
      this.userInfo = null
      uni.removeStorageSync('token')
      uni.removeStorageSync('openid')
      uni.removeStorageSync('userInfo')
    }
  }
})
