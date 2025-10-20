<template>
	<view class="tabbar">
		<view class="tabbar-item" :class="current === 0 ? 'tabbar-item-active' : ''" @click="switchTab('/pages/index/index')">
			<view class="tabbar-item-container">
				<view class="image-box">
					<image class="icon" src="/static/tabbar/home.png" mode="widthFix" />
				</view>
				<text>首页</text>
			</view>
		</view>
		<view class="tabbar-item" :class="current === 1 ? 'tabbar-item-active' : ''" @click="switchTab('/pages/care/index')">
			<view class="tabbar-item-container">
				<view class="img-center-box">
					<image class="icon" src="/static/tabbar/care.png" mode="widthFix" />
				</view>
				<text>洗护师</text>
			</view>
		</view>
		<view class="tabbar-item" :class="current === 2 ? 'tabbar-item-active' : ''" @click="switchTab('/pages/profile/index')">
			<view class="tabbar-item-container">
				<view class="image-box">
					<image class="icon" src="/static/tabbar/my.png" mode="widthFix" />
				</view>
				<text>我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-tabbar",
		props: {
			current: Number
		},
		data() {
			return {

			};
		},
		methods: {
			switchTab(url) {
				uni.switchTab({
					url: url
				});
			}
		},
		
	}
</script>

<style lang="scss">
.tabbar{
	display: flex;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	background: linear-gradient(180deg, #FFD111 0%, #FEE126 47.46%);
	border-top-right-radius: 20rpx;
	border-top-left-radius: 20px;
	display: flex;
	border-top: 1px solid #eee;
	z-index: 99999;
	.tabbar-item {
	  flex: 1;
	  text-align: center;
	  position: relative;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding-top: 0;
	  text{
		  color: #000;
		  font-size: 24rpx;
		  margin-top: 0rpx;
	  }
	  .image-box{
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  transition: all 0.5s;
	  }
	}
	
	.tabbar-item-active{
		text{
			font-weight: 600;
		}
		.image-box{
			width: 78rpx;
			height: 78rpx;
			background:url("/static/tabbar/btn-bg.png") no-repeat;
			background-size: cover;
			background-position: center;
			
		}
	}
	
	.tabbar-item-container{
		position: absolute;
		bottom: 0;
		left: 50%;
		transform:translate(-50%,0);
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		padding-bottom: 4rpx;
	}
	
	.img-center-box{
		width: 140rpx;
		height: 140rpx;
		background: #fff;
		border-radius: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 120rpx;
		}
	}
	.icon {
	  width: 40rpx;
	}
}
</style>