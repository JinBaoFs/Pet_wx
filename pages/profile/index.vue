<template>
	<view class="my-page">
		<!-- 顶部用户信息 -->
		<view class="user-info" :style="navStyle">
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
				<view class="header-r">
					<text class="more" @click="goToOrders">全部</text>
					<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
				</view>
				
			</view>
			<view class="order-status">
				<view class="status-item" v-for="item in orderList" :key="item.text">
					<view class="img-box">
						<image :src="item.icon" class="status-icon" />
						<view class="round-tips" v-if="item.num">{{item.num}}</view>
					</view>
					<text class="status-text">{{ item.text }}</text>
				</view>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="section">
			<view class="menu-item" v-for="item in menuList" :key="item.text" @click="item.action">
				<view class="item-l">
					<image class="menu-icon" :src="item.icon" />
					<text class="menu-text">{{ item.text }}</text>
				</view>
				<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
			</view>
		</view>

		<view class="login-out">
			<u-button type="primary" color="#EBEBEB" :customStyle="{color: '#000', fontWeight: 500}">退出登录</u-button>
		</view>
		<CustomTabbar :current="2" />
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import CustomTabbar from "@/components/custom-tabbar.vue"
import { useSystemInfo } from '@/common/hooks/useSystemInfo.js'

const { statusBarHeight, navBarHeight } = useSystemInfo()

const navStyle = computed(() => ({
  paddingTop: `${statusBarHeight.value}px`,
  height: `${statusBarHeight.value + navBarHeight.value}px`,
}))

// 响应式数据
const user = reactive({
	avatar: '/static/avatar.png',
	nickname: 'oDiv',
	phone: '13631531284',
})

const orderList = ref([
	{
		icon: '/static/images/order-01.png',
		text: '待付款',
		num: 2,
	},
	{
		icon: '/static/images/order-02.png',
		text: '待服务',
		num: 1,
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
		icon: '/static/images/menu-01.png',
		text: '我的宠物',
		action: () => uni.navigateTo({
			url: '/pages/user/petList'
		})
	},
	{
		icon: '/static/images/menu-02.png',
		text: '地址管理',
		action: () => uni.navigateTo({
			url: '/pages/user/address'
		})
	},
	{
		icon: '/static/images/menu-03.png',
		text: '联系客服',
		action: () => uni.makePhoneCall({
			phoneNumber: '10086'
		})
	},
	{
		icon: '/static/images/menu-04.png',
		text: '意见反馈',
		action: () => uni.navigateTo({
			url: '/pages/user/address'
		})
	},
	{
		icon: '/static/images/menu-05.png',
		text: '关于宠爱Fun',
		action: () => uni.navigateTo({
			url: '/pages/user/address'
		})
	}
])

// 方法
const goToOrders = () => {
	uni.navigateTo({
		url: '/pages/user/orderList'
	})
}

const onLogin = async () => {
  const { code } = await wx.login()
  const profile = await wx.getUserProfile({ desc: '用于完善资料' })
  const res = await uni.request({
    url: 'https://yourapi.com/login',
    method: 'POST',
    data: { code, ...profile.userInfo }
  })
}
</script>

<style scoped lang="scss">
page {
	background-color: #f8f8f8;
}

.my-page{
	padding-bottom: 100rpx;
}

.user-info {
	background: #fff;
	padding: 30rpx 40rpx;
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
	.header-r{
		display: flex;
		align-items: center;
		gap: 8rpx;
		.more {
			color: #999;
			font-size: 28rpx;
			font-weight: 400;
		}
	}
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
	padding: 36rpx 40rpx;
	border-bottom: 1px solid #f1f1f1;
	justify-content: space-between;
	.item-l{
		display: flex;
		align-items: center;
	}
	background: #fff;
	&:last-child{
		border: none;
	}
	.menu-icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
	}
	
	.menu-text {
		font-size: 28rpx;
		color: #020202;
		font-weight: 500;
	}
}

.login-out{
	margin-top: 40rpx;
	padding: 0 100rpx;
}


</style>