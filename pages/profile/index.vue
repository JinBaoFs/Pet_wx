<template>
	<view class="my-page">
		<!-- 顶部用户信息 -->
		<view class="user-info">
			<image class="avatar" :src="user.avatar" />
			<view class="desc-box text-primary">
				<text class="nickname">{{ user.nickname }}</text>
				<text class="phone">{{ user.phone }}</text>
			</view>
		</view>

		<!-- 我的订单 -->
		<view class="section">
			<view class="section-header">
				<view class="header-l">
					<image class="icon" src="/static/images/wallet.png" mode="widthFix" />
					<text class="title font28">我的订单</text>
				</view>
				<text class="more" @click="goToOrders">查看全部订单 ></text>
			</view>
			<view class="order-status">
				<view class="status-item" v-for="item in orderList" :key="item.text">
					<view class="img-box">
						<image :src="item.icon" class="status-icon" />
						<view class="round-tips">2</view>
					</view>
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

		<CustomTabbar :current="2" />
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CustomTabbar from "@/components/custom-tabbar.vue";

// 响应式数据
const user = reactive({
	avatar: '/static/avatar.png',
	nickname: 'oDiv',
	phone: '13631531284',
})

const orderList = ref([
	{
		icon: '/static/images/order-01.png',
		text: '待付款'
	},
	{
		icon: '/static/images/order-02.png',
		text: '待服务'
	},
	{
		icon: '/static/images/order-03.png',
		text: '待确认'
	},
	{
		icon: '/static/images/order-04.png',
		text: '已完成'
	},
	{
		icon: '/static/images/order-05.png',
		text: '已取消'
	}
])

const menuList = ref([
	{
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
])

// 方法
const goToOrders = () => {
	uni.navigateTo({
		url: '/pages/order/list'
	})
}
</script>

<style scoped lang="scss">
.my-page {
	background-color: #f8f8f8;
	min-height: 100vh;
}

.user-info {
	background: #fff;
	padding: 40rpx;
	display: flex;
	align-items: center;
	gap: 20rpx;
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: #ccc;
	}
	.desc-box{
		display: flex;
		flex-direction: column;
		align-items: left;
		.nickname {
			font-size: 28rpx;
			margin-bottom: 10rpx;
		}
		
		.phone {
			font-size: 28rpx;
		}
	}
}

.section {
	background: #fff;
	margin-top: 20rpx;
}

.section-header {
	display: flex;
	justify-content: space-between;
	border-bottom: 2rpx #E9E9E9 solid;
	padding: 40rpx;
	.header-l{
		display: flex;
		align-items: center;
		gap: 8rpx;
		.icon{
			width: 48rpx;
		}
		.title{
			color: #020202;
		}
	}
}



.more {
	color: #999;
	font-size: 26rpx;
}

.order-status {
	display: flex;
	justify-content: space-between;
	padding: 40rpx 40rpx;
}

.status-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.img-box{
	position: relative;
	.status-icon {
		width: 36rpx;
		height: 36rpx;
	}
	
	.round-tips{
		width: 24rpx;
		height: 24rpx;
		font-size: 20rpx;
		position: absolute;
		right: -24rpx;
		top: -12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 2rpx #FF4B4B solid;
		color: #FF4B4B;
	}
}


.status-text {
	font-size: 24rpx;
	color: #666;
	font-weight: 400;
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