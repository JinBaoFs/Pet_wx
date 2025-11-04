<template>
	<view class="care-container">
		<view class="care-content" v-if="pageData.showCare">
			<view class="head-info">
				<view class="info-l">
					<image class="avatar-img" src="/static/images/logo-02.png" mode="widthFix"></image>
					<text class="idx">1号</text>
				</view>
				
				<view class="info-c">
					<view class="nickname">昵称:oDiv</view>
					<view class="signer">3年专业宠物洗护,还你一个健康干净的猫猫狗狗....</view>
					<view class="phone">13631531284</view>
				</view>
				<view  class="info-r">
					<view class="edit-btn">编辑</view>
				</view>
			</view>
			<view class="menu-list">
				<view class="item" @click="handleToWallet">
					<view class="item-l">
						<image src="/static/images/wallet.png" mode="widthFix"></image>
						<view class="label">我的钱包</view>
					</view>
					<view class="item-r">
						<text class="money text-green">971.06</text>
						<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
					</view>
				</view>
				<view class="item">
					<view class="item-l">
						<image src="/static/images/care-02.png" mode="widthFix"></image>
						<view class="label">我的保证金</view>
					</view>
					<view class="item-r">
						<text class="money text-primary" v-if="pageData.deposit">500.00</text>
						<text class="money text-error" v-else>待缴纳</text>
						<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
					</view>
				</view>
				<view class="item">
					<view class="item-l">
						<image src="/static/images/care-03.png" mode="widthFix"></image>
						<view class="label">我的洗护订单</view>
					</view>
					<view class="item-r">
						<view class="dot-num">5</view>
						<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
					</view>
				</view>
				<view class="item">
					<view class="item-l">
						<image src="/static/images/care-04.png" mode="widthFix"></image>
						<view class="label">我的健康证</view>
					</view>
					<view class="item-r">
						<text class="money text-primary" v-if="pageData.isJk">正常</text>
						<text class="money text-error" v-else>已过期</text>
						<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
					</view>
				</view>
				<view class="item">
					<view class="item-l">
						<image src="/static/images/care-05.png" mode="widthFix"></image>
						<view class="label">接单设置</view>
					</view>
					<view class="item-r">
						<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
					</view>
				</view>
				<view class="item">
					<view class="item-l">
						<image src="/static/images/care-06.png" mode="widthFix"></image>
						<view class="label">联系客服</view>
					</view>
					<view class="item-r">
						<up-icon name="arrow-right" size="28rpx" color="#354D6E" top="2rpx"></up-icon>
					</view>
				</view>
			</view>
		</view>
		
		<view class="empty-container" v-if="!pageData.showCare">
			<image class="logo" src="/static/images/logo-02.png" mode="widthFix"></image>
			<view class="status-item" v-if="pageData.careStatus == 1">
				<text class="text-primary status-text">您还不是洗护师</text>
				<text class="text-tips">可以点击申请成为洗护师，开始接单上门洗护</text>
				<u-button type="primary" color="#FEE126" :customStyle="{color: '#000', fontWeight: 500}" class="btn" @click="handleToApply">申请成为洗护师</u-button>
			</view>	
			<view class="status-item" v-if="pageData.careStatus == 2">
				<text class="text-green status-text">洗护师申请中</text>
				<text class="text-tips">您的洗护师账号已申请，请稍后联系</text>
				<u-button type="primary" color="#FEE126" :customStyle="{color: '#000', fontWeight: 500}" class="btn">电话咨询申请进度</u-button>
			</view>	
			
			<view class="status-item" v-if="pageData.careStatus == 3">
				<text class="text-error status-text">拒绝申请</text>
				<text class="text-tips">健康证的过期时间未匹配，请重新申请</text>
				<u-button type="primary" color="#FEE126" :customStyle="{color: '#000', fontWeight: 500}" class="btn">重新申请洗护师</u-button>
			</view>	
		</view>
		<custom-tabbar :current="1" />
	</view>
</template>

<script setup>
	import CustomTabbar from "@/components/custom-tabbar.vue";
	import { reactive } from "vue";
	const pageData = reactive({
		showCare: false,
		careStatus: 1,
		isJk: false,
		deposit: 500.00,
	})
	
	const handleToWallet = () => {
		uni.navigateTo({
			url:'/pages/carepg/wallet'
		})
	}
	
	const handleToApply = (type) => {
		const url = type ? `/pages/carepg/apply?type=${1}` : '/pages/carepg/apply'
		uni.navigateTo({ url })
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #f8f8f8;
}

.care-container{
	padding-bottom: 120rpx;
	.text-primary{
		color: #249CE2;
	}
	
	.text-green{
		color: #2CC44A;
	}
	.text-error{
		color: #FF4B4B;
	}
	.care-content{
		.head-info{
			display: flex;
			background: #fff;
			padding: 20rpx 40rpx;
			gap: 20rpx;
			.info-l{
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 10rpx;
				flex-shrink: 0;
			}
			.avatar-img{
				width: 120rpx;
			}
			.idx{
				font-size: 28rpx;
				font-weight: 500;
				color: #354D6E;
			}
			.info-c{
				display: flex;
				flex-direction: column;
				flex: 1;
				.nickname{
					font-size: 28rpx;
					font-weight: 500;
					color: #354D6E;
				}
				.signer{
					font-size: 20rpx;
					max-width: 90%;
					color: #666666;
					font-weight: 400;
					margin-top: 12rpx;
				}
				.phone{
					margin-top: 20rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #354D6E;
				}
			}
			.edit-btn{
				flex-shrink: 0;
				padding: 10rpx 24rpx;
				font-size: 24rpx;
				color: #000000;
				font-weight: 500;
				border: 2rpx #FEE126 solid;
				border-radius: 8rpx;
				min-height:0;
				background: none;
			}
		}
		.menu-list{
			margin-top: 20rpx;
			.item{
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx #E9E9E9 solid;
				background: #fff;
				padding: 40rpx;
				&:last-child{
					border: none;
					
				}
				.item-l{
					display: flex;
					align-items: center;
					gap: 20rpx;
					image{
						width: 48rpx;
					}
					.label{
						font-size: 28rpx;
						font-weight: 500;
						color: #020202;
					}
				}
				.item-r{
					display: flex;
					align-items: center;
					gap: 20rpx;
					.money{
						font-size: 28rpx;
					}
					.dot-num{
						color: #fff;
						background: #FF4B4B;
						padding: 10rpx 24rpx;
						border-radius: 44rpx;
						font-size: 24rpx;
					}
				}
				
			}
		}
	}
	.empty-container{
		display: flex;
		flex-direction: column;
		padding: 100rpx 40rpx;
		align-items: center;
		.logo{
			width: 144rpx;
		}
		.status-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 64rpx;
			.status-text{
				margin-bottom: 20rpx; 
				font-size: 32rpx;
				font-weight: 400;
			}
			.text-tips{
				font-size: 28rpx;
				color: #666666;
			}
			.btn{
				margin-top: 100rpx;
			}
		}
	}
}
</style>
