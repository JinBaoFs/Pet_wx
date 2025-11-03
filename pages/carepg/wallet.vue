<template>
	<view class="wallet-container">
		<view class="top-box">
			<view class="total-box">
				<view class="label">累计收益总额</view>
				<view class="value">1132.57</view>
			</view>
			<view class="user-box">
				<view class="user-l">
					<text class="label">可用余额</text>
					<text class="value">917.06</text>
				</view>
				<view class="user-r">
					<view class="cash-btn">提现</view>
				</view>
			</view>
		</view>
		<view class="detail-box">
			<view class="detail-head">
				<text class="label">余额明细</text>
				<view class="date" @click="pageData.dateTimePickShow = true">
					<text class="num">{{new Date(pageData.time).getFullYear()}}</text>年
					<text class="num">{{new Date(pageData.time).getMonth()+1}}</text>月
					<up-icon name="arrow-down-fill" size="28rpx" color="#354D6E"></up-icon>
				</view>
				<up-datetime-picker
					:show="pageData.dateTimePickShow" 
					v-model="pageData.time"
					:minDate="pageData.minDate" 
					:maxDate="pageData.maxDate" 
					@cancel="() => (pageData.dateTimePickShow = false)"
					@confirm="serverDateConfirm"
					mode="year-month"
					confirmColor="#FFB10C"
				></up-datetime-picker>
			</view>
			<view class="list">
				<view class="item" v-for="(item,idx) in pageData.recordList" :key="idx">
					<view class="item-l">
						<view class="name">{{item.name}}</view>
						<view class="time">{{item.time}}</view>
					</view>
					<view class="val">+{{item.val}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive } from "vue";
	const pageData = reactive({
		time: Date.now(),
		dateTimePickShow: false,
		minDate: null,
		maxDate: Date.now(),
		recordList: [
			{ name: "服务费", time: "06/20 18:53", val: 68 },
			{ name: "服务费", time: "05/28 18:53", val: 128 },
			{ name: "服务费", time: "05/25 18:53", val: 20 },
			{ name: "服务费", time: "04/28 18:53", val: 30 },
			{ name: "服务费", time: "03/26 18:53", val: 50 },
			{ name: "服务费", time: "03/20 18:53", val: 60 },
			{ name: "服务费", time: "03/21 18:53", val: 70 },
			{ name: "服务费", time: "02/20 18:53", val: 40 }
		]
	})
	
	const serverDateConfirm = (e) => {
	  pageData.serverTime = e.value
	  pageData.dateTimePickShow = false
	}
	
	
	
</script>

<style lang="scss" scoped>
	page{
		background-color: #f8f8f8;
	}
	.wallet-container{
		.top-box{
			padding: 40rpx;
		}
		.total-box{
			display: flex;
			flex-direction: column;
			height: 284rpx;
			align-items: center;
			justify-content: center;
			background: linear-gradient(180deg, #FFD111 0%, #FEE126 47.46%);
			border-radius: 32rpx;
			.label{
				font-weight:500;
				font-size: 28rpx;
			}
			.value{
				font-size: 56rpx;
				font-weight: 600;
			}

		}
		
		.user-box{
			background: #fff;
			box-shadow: 0px 1px 4px 0px #0000001C;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx;
			border-radius: 32rpx;
			margin-top: 40rpx;
			.user-l{
				display: flex;
				flex-direction: column;
				justify-content: center;
				.label{
					font-size: 28rpx;
					color: #354D6E;
					font-weight: 500;
				}
				.value{
					color: #2CC44A;
					font-size: 56rpx;
					font-weight: 600;
				}
			}
			.cash-btn{
				background: #FEE126;
				border-radius: 44rpx;
				padding: 20rpx 62rpx;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
		
		.detail-box{
			background: #fff;
			
			.detail-head{
				padding: 40rpx 40rpx 0 40rpx;
				.label{
					color: #354D6E;
					font-size: 28rpx;
					font-weight: 500;
				}
				.date{
					display: flex;
					align-items: baseline;
					font-size: 28rpx;
					color: #354D6E;
					font-weight: 500;
					.num{
						font-size: 40rpx;
					}
				}
			}
			
			.item{
				border-bottom: 2rpx #F2F2F2 solid; 
				padding: 20rpx 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item-l{
					.name{
						font-size: 28rpx;
						color: #354D6E;
						font-weight: 500;
					}
					
					.time{
						font-size: 24rpx;
						color: #C6C6C6;
						font-weight: 500;
						margin-top: 4rpx;
					}
				}
				
				.val{
					font-size: 28rpx;
					color: #354D6E;
					font-weight: 500;
				}
			}
		}
	}
</style>