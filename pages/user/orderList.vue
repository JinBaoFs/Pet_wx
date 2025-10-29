<template>
	<view class="order-page">
		<!-- 顶部 Tabs -->
		<up-tabs :list="tabs" lineColor="#FFD200" activeColor="#333" inactiveColor="#999" :scrollable="false"
			@click="changeTab" :current="currentTab" />

		<!-- 订单列表 -->
		<scroll-view scroll-y class="order-list">
			<view v-for="item in filteredList" :key="item.id" class="order-card">
				<view class="order-header">
					<view class="order-header-left">
						<view class="order-shop">{{ item.shop }}</view>
						<view class="order-no">订单号：{{ item.orderNo }}</view>
					</view>
					<view class="order-status" :class="statusMap[item.status].class">
						{{ statusMap[item.status].text }}
					</view>
				</view>

				<view class="order-body">
					<image src="/static/tabbar/list-01.png" mode="widthFix" class="goods-img"></image>
					<view class="order-info">
						<view class="order-title">{{ item.title }}</view>
						<view class="order-desc">{{ item.desc }}</view>
						<view class="info-bot">
							<view class="order-price">￥{{ item.price }}</view>
							<view class="btn-group">
								<view class="cancel-btn" v-if="item.status=='待付款'">取消订单</view>
								<view class="success-btn" v-if="item.status=='待付款'">立即付款</view>
								<view class="success-btn" v-if="item.status=='待确认'">洗护确认完成</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
			<view v-if="filteredList.length === 0" class="empty">
				<up-empty text="暂无订单"></up-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'

	const tabs = ref([{
			name: '全部'
		},
		{
			name: '待付款'
		},
		{
			name: '待服务'
		},
		{
			name: '待确认'
		},
		{
			name: '已完成'
		},
		{
			name: '已取消'
		},
	])

	const currentTab = ref(0)

	const orderList = ref([{
			id: 1,
			shop: '宠爱FUN',
			orderNo: 'P3423289750',
			cover: '/static/order/cat.png',
			title: '猫咪上门洗护',
			desc: '品类：猫咪，小型宠物，5kg以下',
			price: 58,
			status: '待付款',
		},
		{
			id: 2,
			shop: '宠爱FUN',
			orderNo: 'P3423289751',
			cover: '/static/order/cat.png',
			title: '猫咪上门洗护',
			desc: '品类：猫咪，小型宠物，5kg以下',
			price: 58,
			status: '待服务',
		},
		{
			id: 3,
			shop: '宠爱FUN',
			orderNo: 'P3423289752',
			cover: '/static/order/cat.png',
			title: '猫咪上门洗护',
			desc: '品类：猫咪，小型宠物，5kg以下',
			price: 58,
			status: '待确认',
		},
		{
			id: 4,
			shop: '宠爱FUN',
			orderNo: 'P3423289753',
			cover: '/static/order/cat.png',
			title: '猫咪上门洗护',
			desc: '品类：猫咪，小型宠物，5kg以下',
			price: 58,
			status: '已完成',
		},
	])

	// 状态映射表
	const statusMap = {
		待付款: {
			text: '待付款',
			class: 'status-wait',
			actions: [{
					text: '取消订单',
					type: 'default',
					plain: true,
				},
				{
					text: '立即付款',
					type: 'warning',
					plain: false,
				},
			],
		},
		待服务: {
			text: '待服务',
			class: 'status-green',
			actions: [{
				text: '联系客服',
				type: 'default',
				plain: true,
				onClick: (item) => console.log('联系客服', item.id),
			}, ],
		},
		待确认: {
			text: '待确认',
			class: 'status-orange',
			actions: [{
				text: '洗护完成确认',
				type: 'warning',
				plain: false,
				onClick: (item) => console.log('确认完成', item.id),
			}, ],
		},
		已完成: {
			text: '已完成',
			class: 'status-gray',
			actions: [{
				text: '再来一单',
				type: 'default',
				plain: true,
				onClick: (item) => console.log('再来一单', item.id),
			}, ],
		},
	}

	// 当前列表过滤
	const filteredList = computed(() => {
		const tabName = tabs.value[currentTab.value].name
		if (tabName === '全部') return orderList.value
		return orderList.value.filter((item) => item.status === tabName)
	})

	const changeTab = (e) => {
		currentTab.value = e.index
	}
</script>

<style scoped lang="scss">
	page {
		background: #F8F8F8;
	}

	.order-page {}

	.order-list {
		padding: 16rpx 0rpx;
		box-sizing: border-box;
	}

	.order-card {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

		.order-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;
			color: #666;
			margin-bottom: 10rpx;

			.order-header-left {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 20rpx;
			}

			.order-shop {
				font-weight: 600;
				color: #333;
			}

			.order-status {
				font-size: 28rpx;
				font-weight: 500;

				&.status-wait {
					color: #5197F7;
				}

				&.status-green {
					color: #2CC44A;
				}

				&.status-orange {
					color: #FF4B4B;
				}

				&.status-gray {
					color: #666;
				}
			}
		}

		.order-body {
			display: flex;
			margin-top: 20rpx;

			.goods-img {
				width: 220rpx;
				flex-shrink: 0;
			}

			.order-info {
				flex: 1;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.order-title {
					font-size: 28rpx;
					font-weight: 500;
					color: #354D6E;
				}

				.order-desc {
					color: #999;
					font-size: 24rpx;
					margin-top: 8rpx;
				}

				.info-bot {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.btn-group {
						display: flex;
						align-items: center;
						gap: 10rpx;
						font-size: 24rpx;
						color: #000;
						margin-top: 10rpx;
					}
					
					.success-btn{
						padding: 10rpx 20rpx;
						border-radius: 30rpx;
						background: linear-gradient(180deg, #FFD111 0%, #FEE126 47.46%);
					}
					
					.cancel-btn{
						padding: 10rpx 20rpx;
						border: 2rpx #FEE126 solid;
						border-radius: 30rpx;
					}
					
				}

				.order-price {
					color: #FF4B4B;
					font-size: 40rpx;
					font-weight: bold;
				}
			}
		}

		.order-footer {
			display: flex;
			justify-content: flex-end;
			margin-top: 20rpx;

			.order-btn {
				margin-left: 16rpx;
			}
		}
	}

	.empty {
		padding-top: 200rpx;
	}
</style>