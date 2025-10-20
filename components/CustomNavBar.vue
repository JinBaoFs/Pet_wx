<!-- components/CustomNavBar.vue -->
<template>
  <view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="nav-content">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '自定义标题'
    }
  },
  data() {
    return {
      statusBarHeight: 0
    }
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync()
    this.statusBarHeight = sysInfo.statusBarHeight
  }
}
</script>

<style scoped>
.custom-navbar {
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
}
.nav-content {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
