<template>
	<view class="page-container">
		<view class="order-info">
			<view class="order-header">
				<view class="header-l">
					<view class="desc">
						<text class="name">宠爱FUN</text>
						<text class="order-no">订单编号:075423658</text>
					</view>
					<view class="time">下单时间:2025-01-01 23:23:44</view>
				</view>
				<view class="status-text">待付款</view>
			</view>
			<view class="order-body">
				<image src="/static/images/list-01.png" mode="widthFix" class="goods-img"></image>
				<view class="info">
					<view class="order-title">猫猫上门洗护洗护</view>
					<view class="order-desc">已选：普通洗护，小型犬（5kg 以下）</view>
					<view class="info-bot">
						<view class="order-price">￥58</view>
						<view class="btn-group">
							<view class="cancel-btn" v-if="item.status=='待付款'">取消订单</view>
							<view class="success-btn" v-if="item.status=='待付款'">立即付款</view>
							<view class="success-btn" v-if="item.status=='待确认'">洗护确认完成</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pet-info">
			<view class="pet-title">宠物信息:</view>
			<view class="pet-item">
				<view class="label">宠物类型:</view>
				<view class="value">猫猫</view>
			</view>
			<view class="pet-item">
				<view class="label">宠物名称:</view>
				<view class="value">Money</view>
			</view>
			<view class="pet-item">
				<view class="label">宠物品种:</view>
				<view class="value">金渐层</view>
			</view>
			<view class="pet-item">
				<view class="label">宠物毛色:</view>
				<view class="value">金色</view>
			</view>
			<view class="pet-item">
				<view class="label">宠物年龄:</view>
				<view class="value">1年7个月</view>
			</view>
			<view class="pet-item">
				<view class="label">宠物性别:</view>
				<view class="value">公</view>
			</view>
			<view class="pet-item">
				<view class="label">宠物图片:</view>
				<view class="image"></view>
			</view>
			<view class="desc">宠物备注事项:需要处理一下脚指甲</view>
		</view>
		
		<view class="pet-info">
			<view class="pet-title">上门服务信息:</view>
			<view class="pet-item">
				<view class="label">服务时间预约:</view>
				<view class="value">2025-06-15 09:00-11:00</view>
			</view>
			<view class="pet-item">
				<view class="label">联系人:</view>
				<view class="value">林小姐</view>
			</view>
			<view class="pet-item">
				<view class="label">联系人:</view>
				<view class="value">林小姐</view>
			</view>
			<view class="pet-item">
				<view class="label">手机号:</view>
				<view class="value">18806608888</view>
			</view>
			<view class="pet-item">
				<view class="label">地址:</view>
				<view class="value">广东省深圳市龙岗区龙城街道鹏达路188号</view>
			</view>
			<view class="pet-item">
				<view class="label">门牌号:</view>
				<view class="value">1栋1206</view>
			</view>
		</view>
		
		<view class="care-info">
			<view class="title">洗护师信息:</view>
			<view class="info">
				<view class="info-l">
					<view class="avatar"></view>
					<veiw class="idx">1号</veiw>
				</view>
				<view class="info-r">
					<view class="name">oDiv</view>
					<view class="desc">个性签名.</view>
					<view class="time">加入宠爱:3年6个月25天</view>
					<view class="phone">
						<text class="val">手机号:18806608888</text>
						<view class="call-btn">拨打电话</view>
					</view>
				</view>
				<view class="total-order">累计订单:128</view>
			</view>
		</view>
		
		<view class="btn-group">
			<u-button type="primary" color="#EBEBEB" :customStyle="{color: '#000', fontWeight: 500}">取消订单</u-button>
			<u-button type="primary" color="#FEE126" :customStyle="{color: '#000', fontWeight: 500}">去付款</u-button>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	page{
		background-color: #f8f8f8;
	}
	
	.page-container{
		font-weight: 500;
		.order-info{
			background: #fff;
			padding: 40rpx;
			
			.order-header{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.desc{
					display: flex;
					gap: 20rpx;
					font-size: 24rpx;
					color: #354D6E;
					font-weight: 500;
					.name{
						color: #000;
					}
				}
				.time{
					color: #C6C6C6;
					font-size: 20rpx;
					margin-top: 10rpx;
				}
				
				.status-text{
					font-size: 28rpx;
					font-weight: 500;
				}
			}
			
			.order-body{
				display: flex;
				margin-top: 20rpx;
				.goods-img{
					width: 220rpx;
					flex-shrink: 0;
				}
				
				.info{
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
					.order-price{
						color: #FF4B4B;
						font-size: 40rpx;
						font-weight: bold;
						margin-top: 20rpx;
					}
				}
			}
		}
		.pet-info{
			margin-top: 20rpx;
			padding: 40rpx 60rpx;
			background: #fff;
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			.pet-title{
				font-size: 32rpx;
				font-weight: 500;
				color: #238484;
			}
			.pet-item{
				display: flex;
				align-items: center;
				gap: 8rpx;
				color: #354D6E;
				font-size: 24rpx;
				font-weight: 500;
				
				.image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background: pink;
				}
			}
			
			.desc{
				font-size: 24rpx;
				color: #FF4B4B;
				font-weight: 500;
			}
		}
		.care-info{
			margin-top: 20rpx;
			padding: 40rpx 60rpx;
			background: #fff;
			position: relative;
			.title{
				font-size: 32rpx;
				font-weight: 500;
				color: #238484;
			}
			.info{
				display: flex;
				margin-top: 20rpx;
				gap: 20rpx;
				.info-l{
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 20rpx;
					.avatar{
						width: 120rpx;
						height: 120rpx;
						background: pink;
						border-radius: 50%;
					}
					.idx{
						font-size: 28rpx;
						color: #354D6E;
						font-weight: 500;
					}
				}
				
				.name{
					font-size: 32rpx;
					font-weight: 500;
					color: #238484;
				}
				
				.desc{
					font-size: 24rpx;
					color: #979A9E;
					font-weight: 500;
					margin-top: 8rpx;
				}
				
				.time{
					font-size: 24rpx;
					color: #2CC44A;
					margin-top: 8rpx;
				}
				
				.phone{
					display: flex;
					align-items: center;
					gap: 20rpx;
					font-size: 24rpx;
					margin-top: 16rpx;
					color: #354D6E;
					.call-btn{
						padding: 10rpx 20rpx;
						border: 2rpx solid #5197F7;
						border-radius: 44rpx;
						color: #5197F7;
					}
				}
			}
			.total-order{
				position: absolute;
				right: 40rpx;
				top: 40rpx;
				background: #FEE126;
				padding: 16rpx 20rpx;
				border-radius: 44rpx;
				font-size: 20rpx;
				color: #000;
			}
		}
		.btn-group{
			padding: 0 100rpx;
			margin: 40rpx 0;
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			padding-bottom: 40rpx;
		}
	}
</style>