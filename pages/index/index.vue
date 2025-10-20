<template>
	<view class="index">
		<!-- 自定义导航栏 -->
		<view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
			<image class="logo" src="/static/tabbar/logo.png" mode="widthFix" />
		</view>
		<view class="list-box">
			<view class="list-item" v-for="(item,idx) in list" :key="idx">
				<image :src="item.url" mode="widthFix"></image>
			</view>
		</view>
		<custom-tabbar :current="0" />
	</view>
	
</template>

<script>
	import CustomTabbar from "@/components/custom-tabbar.vue";
	export default {
		components: { CustomTabbar },
		data() {
			return {
				statusBarHeight: 0,
				list: [
					{
						url: '/static/tabbar/list-01.png'
					},
					{
						url: '/static/tabbar/list-02.png'
					}
				]
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight // 动态适配刘海屏
			this.getOrders()
		},
		methods: {
			getOrders(){
				uni.request({
					url: 'http://192.168.31.14:3000/api/orders/listAll',
					method: 'GET',
					success:(res)=>{
						console.log(res)
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: rgba(248, 248, 248, 1);
	}
	
	.index{
		.custom-nav {
		  background: #fff;
		  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
		  display: flex;
		  align-items: center;
		  image{
			  width: 240rpx;
			  margin: 12rpx 20rpx;
		  }
		}
		.list-box{
			display: flex;
			flex-direction:  column;
			padding: 20rpx;
			gap: 40rpx;
			image{
				width: 100%;
			}
		}
	}
</style>
