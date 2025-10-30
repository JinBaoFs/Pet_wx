// api/user.js
import { request } from './request.js'

// 登录
export const login = (data) => request({
  url: '/user/login',
  method: 'POST',
  data,
  hideLoading: true
})

// 获取用户信息
export const getUserInfo = () => request({
  url: '/user/info',
  method: 'GET'
})