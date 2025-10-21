<template>
	<view class="index">
		<view class="list-box">
			<view class="list-item" v-for="(item,idx) in list" :key="idx" @click="handleToDetail">
				<image :src="item.url" mode="widthFix"></image>
			</view>
		</view>
		<custom-tabbar :current="0" />
	</view>
	
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CustomTabbar from '@/components/custom-tabbar.vue'

// 响应式数据
const list = ref([
  { url: '/static/tabbar/list-01.png' },
  { url: '/static/tabbar/list-02.png' }
])

// 生命周期函数
onLoad(() => {
  console.log('页面加载完成')
})

const handleToDetail = () => {
	uni.navigateTo({
		url: '/pages/goods/goods-detail'
	})
}
</script>

<style lang="scss" scoped>
	page{
		background: rgba(248, 248, 248, 1);
	}
	
	.index{
		.list-box{
			display: flex;
			flex-direction:  column;
			padding: 36rpx 36rpx;
			image{
				width: 100%;
			}
		}
	}
</style>
