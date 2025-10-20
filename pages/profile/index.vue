<template>
	<view class="my-page">
		<!-- 顶部用户信息 -->
		<view class="user-info">
			<image class="avatar" :src="user.avatar" />
			<view class="nickname">{{ user.nickname }}</view>
		</view>

		<!-- 我的订单 -->
		<view class="section">
			<view class="section-header">
				<text class="title">我的订单</text>
				<text class="more" @click="goToOrders">查看全部订单 ></text>
			</view>
			<view class="order-status">
				<view class="status-item" v-for="item in orderList" :key="item.text">
					<image :src="item.icon" class="status-icon" />
					<text class="status-text">{{ item.text }}</text>
				</view>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="section">
			<view class="menu-item" v-for="item in menuList" :key="item.text" @click="item.action">
				<image class="menu-icon" :src="item.icon" />
				<text class="menu-text">{{ item.text }}</text>
			</view>
		</view>

		<custom-tabbar :current="2" />
	</view>
</template>

<script>
	import CustomTabbar from "@/components/custom-tabbar.vue";
	export default {
		components: {
			CustomTabbar
		},
		data() {
			return {
				user: {
					avatar: '/static/avatar.png',
					nickname: '点击登录'
				},
				orderList: [{
						icon: '/static/order/daifukuan.png',
						text: '待付款'
					},
					{
						icon: '/static/order/daifahuo.png',
						text: '待发货'
					},
					{
						icon: '/static/order/daishouhuo.png',
						text: '待收货'
					},
					{
						icon: '/static/order/daipingjia.png',
						text: '待评价'
					}
				],
				menuList: [{
						icon: '/static/menu/address.png',
						text: '收货地址',
						action: () => uni.navigateTo({
							url: '/pages/address/index'
						})
					},
					{
						icon: '/static/menu/service.png',
						text: '联系客服',
						action: () => uni.makePhoneCall({
							phoneNumber: '10086'
						})
					},
					{
						icon: '/static/menu/about.png',
						text: '关于我们',
						action: () => uni.navigateTo({
							url: '/pages/about/index'
						})
					}
				]
			}
		},
		methods: {
			goToOrders() {
				uni.navigateTo({
					url: '/pages/order/list'
				})
			}
		}
	}
</script>

<style scoped>
	.my-page {
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	.user-info {
		background: #fff;
		padding: 40rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: #ccc;
	}

	.nickname {
		margin-top: 20rpx;
		font-size: 32rpx;
		color: #333;
	}

	.section {
		background: #fff;
		margin-top: 20rpx;
		padding: 20rpx;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.title {
		font-weight: bold;
		font-size: 30rpx;
	}

	.more {
		color: #999;
		font-size: 26rpx;
	}

	.order-status {
		display: flex;
		justify-content: space-around;
	}

	.status-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.status-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.status-text {
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #f1f1f1;
	}

	.menu-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.menu-text {
		font-size: 28rpx;
	}
</style>