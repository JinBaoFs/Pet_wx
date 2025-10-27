<template>
	<view class="address-container">
		<view class="address-list" v-if="addressList && addressList.length">
			<view class="address-item" v-for="(item,idx) in addressList">
				<view class="info">
					<view class="desc-info">
						<text>{{item.name}}</text>
						<text>({{item.gender == 1 ? '先生' : '女士'}})</text>
						<text>{{item.phone}}</text>
					</view>
					<view class="address-info">
						{{item.detail}}
					</view>
				</view>
				<view class="tool">
					<view class="tool-l">
						<up-checkbox-group shape="circle" size="16" :disable="type">
							<up-checkbox activeColor="#FEE126" labelSize="12" label="设置为默认地址"
								:checked="item.default"></up-checkbox>
						</up-checkbox-group>
					</view>
					<view class="tool-r">
						<view class="t-btn del-btn" v-if="!type">删除</view>
						<view class="t-btn edit-btn" v-if="!type">修改</view>
						<view class="t-btn sel-btn" v-if="type" @click="selectAddress(item)">选择</view>
					</view>
				</view>
			</view>
		</view>
		<view class="not-empty" v-if="!addressList || !addressList.length">
			暂无地址，请添加地址!
		</view>
		
		<view class="add-box">
			<view class="add-btn" @click="handleToAddAddress">添加地址</view>
		</view>
		
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		getCurrentInstance
	} from 'vue'
	const type = ref(null)

	onLoad((options) => {
		type.value = options.type || null
	})

	const addressList = ref([{
			id: 1,
			name: '张三',
			gender: 1,
			phone: '13800000000',
			detail: '广东省 深圳市 龙岗区 龙岗街道 中骏云景华府-2505',
			default: true
		},
		{
			id: 2,
			name: '李四',
			gender: 2,
			phone: '13900000000',
			detail: '广东省 深圳市 龙岗区 龙岗街道 中骏云景华府-2505'
		}
	])

	const instance = getCurrentInstance()
	const eventChannel = instance?.proxy?.getOpenerEventChannel()

	const selectAddress = (item) => {
		eventChannel.emit('returnAddress', item)
		uni.navigateBack()
	}
	
	const handleToAddAddress = () => {
		uni.navigateTo({
			url: '/pages/user/addAddress'
		})
	}
</script>

<style lang="scss" scoped>
	page {
		background: rgba(248, 248, 248, 1);
	}

	.address-container {
		background-color: #f8f8f8;

		.address-item {
			background: #fff;
			margin-bottom: 20rpx;

			.info {
				border-bottom: 2rpx #ddd solid;
				padding: 20rpx;

				.desc-info {
					font-size: 28rpx;
					color: #333;
					font-weight: 500;
				}

				.address-info {
					font-size: 24rpx;
					color: #999;
					font-weight: 500;
				}
			}

			.tool {
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.tool-l,
				.tool-r {
					display: flex;
					align-items: center;
					font-size: 24rpx;
				}

				.tool-r {
					gap: 20rpx;
				}

				.t-btn {
					padding: 10rpx 40rpx;
					border-radius: 40rpx;
					color: #fff;
				}

				.del-btn {
					background: #FF4B4B
				}

				.edit-btn {
					background: #5197F7
				}

				.sel-btn {
					background: #e9b10b
				}
			}
		}
		.not-empty{
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 200rpx;
			font-size: 28rpx;
			color: #999;
		}
		.add-box{
			display: flex;
			justify-content: center;
			margin-top: 40rpx;
			.add-btn{
				padding: 20rpx 40rpx;
				background: #FEE126;
				color: #000000;
				font-size: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
				font-weight: 500;
			}
		}
	}

</style>