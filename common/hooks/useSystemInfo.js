// hooks/useSystemInfo.js
import { ref } from 'vue'

export function useSystemInfo() {
  const systemInfo = ref({})
  const navBarHeight = ref(44) // 默认导航栏高度（一般为 44px）
  const statusBarHeight = ref(20)
  const safeAreaBottom = ref(0)
  const safeAreaTop = ref(0)
  const windowHeight = ref(0)
  const isIphoneX = ref(false)

  const getSystemInfo = () => {
    try {
      const info = uni.getSystemInfoSync()
      systemInfo.value = info

      statusBarHeight.value = info.statusBarHeight || 20
      windowHeight.value = info.windowHeight

      // 判断底部安全区
      if (info.safeAreaInsets) {
        safeAreaBottom.value = info.safeAreaInsets.bottom
        safeAreaTop.value = info.safeAreaInsets.top
      } else if (info.safeArea) {
        // 兼容旧机型 safeArea 格式
        safeAreaBottom.value = info.screenHeight - info.safeArea.bottom
        safeAreaTop.value = info.safeArea.top
      }

      // 判断 iPhone X 系列
      const model = info.model.toLowerCase()
      isIphoneX.value = /iphone x|iphone 11|iphone 12|iphone 13|iphone 14|iphone 15/.test(model)

      // 根据平台自适应导航栏高度
      // 微信小程序自定义导航栏通常是：状态栏 + 44px
      if (info.platform === 'ios') {
        navBarHeight.value = 44
      } else if (info.platform === 'android') {
        navBarHeight.value = 48
      } else {
        navBarHeight.value = 44
      }
    } catch (e) {
      console.error('getSystemInfoSync failed:', e)
    }
  }

  // 自动初始化
  getSystemInfo()

  return {
    systemInfo,
    statusBarHeight,
    navBarHeight,
    safeAreaBottom,
    safeAreaTop,
    windowHeight,
    isIphoneX,
    getSystemInfo,
  }
}
