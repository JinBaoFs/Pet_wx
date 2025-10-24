<template>
	<view class="add-box">
		<view class="contact">
			<view class="contact-item">
				<view class="item-label">*联系人</view>
				<up-input class="item-input" placeholder="请输入联系人" border="surround" v-model="petName"></up-input>
			</view>
			<view class="contact-item">
				<view class="item-label">*手机号</view>
				<up-input class="item-input" placeholder="请输入手机号" border="surround" v-model="petName"></up-input>
			</view>
			<view class="contact-item">
				<view class="item-label">*性别</view>
				<up-radio-group
				    v-model="gender"
				    placement="row"
					activeColor="#FEE126"
					size="16"
				  >
				    <up-radio
				      :customStyle="{marginBottom: '8px'}"
				      v-for="(item, index) in genderOptions"
				      :key="index"
				      :label="item.name"
				      :name="item.value"
					  labelSize="12"
				    >
				    </up-radio>
				  </up-radio-group>
			</view>
		</view>
		
		<view class="detail-box">
			<view class="d-item">
				<view class="d-label">地址</view>
				<view class="d-info">
					<text class="tips" v-if="!address">广东省深圳市龙岗区龙岗街道..</text>
					<text class="content" v-else>{{address}}</text>
					<up-icon name="arrow-right" size="24rpx" color="#999"></up-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="d-item">
				<view class="d-label">门牌号</view>
				<view class="d-info">
					<up-input class="item-input" placeholder="例：1号楼一单元101室" border="surround" v-model="desc"></up-input>
					<up-icon name="arrow-right" size="24rpx" color="#999"></up-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="d-item">
				<view class="d-label">默认地址</view>
				<up-radio-group
				    v-model="isDefault"
				    placement="row"
					activeColor="#FEE126"
					size="16"
				  >
				    <up-radio label="是" :name="1" labelSize="12"></up-radio>
					<up-radio label="否" :name="2" labelSize="12"></up-radio>
				  </up-radio-group>
			</view>
		</view>
		
		<view class="save-box">
			<view class="save-btn" @click="handleSave">保存</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		getCurrentInstance
	} from 'vue'
	
	const address = ref("广东省深圳市龙岗区")
	const desc = ref("2C1105")
	
	const gender = ref(1);
	const isDefault = ref(2);
	const genderOptions = reactive([
	  { name: '先生', value: 1},
	  { name: '女士', value: 2},
	]);
	
	const handleSave = () => {
		uni.showToast({
			icon: 'none',
			title: '保存成功'
		})
		
		setTimeout(()=>{
			uni.navigateBack()
		},500)
	}
</script>

<style lang="scss" scoped>
	page {
		background: rgba(248, 248, 248, 1);
	}
	.add-box{
		.contact{
			background: #fff;
			padding: 32rpx 40rpx 32rpx 40rpx;
			display: flex;
			flex-direction: column;
			gap: 24rpx;
			.contact-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 16rpx;
				margin-bottom: 24rpx;
				.item-label {
					font-size: 24rpx;
					color: rgba(53, 77, 110, 1);
					flex-shrink: 0;
					width: 140rpx;
					text-align: right;
				}
				.item-input {
					border: 2rpx rgba(221, 221, 221, 1) solid;
					font-size: 24rpx;
				}
			}
		}
		
		.detail-box{
			background: #fff;
			margin-top: 20rpx;
			padding: 32rpx 40rpx 20rpx 40rpx;
			display: flex;
			flex-direction: column;
			gap: 24rpx;
			.line{
				height: 2rpx;
				width: 100%;
				background: #eee;
			}
			.d-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 16rpx;
				height: 80rpx;
				.d-label{
					font-size: 28rpx;
					color: rgba(53, 77, 110, 1);
					flex-shrink: 0;
					width: 140rpx;
					text-align: right;
				}
				
				.d-info{
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.tips{
						font-size: 24rpx;
						font-weight: 400;
						color: #c0c4cc;
						padding-left: 20rpx;
					}
					.content{
						font-size: 24rpx;
						color: #000;
						padding-left: 20rpx;
					}
				}
				
			}
		}
		
		.save-box{
			margin-top: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.save-btn{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 80%;
				height: 100rpx;
				background: #FEE126;
				color: #000;
				font-size: 32rpx;
				font-weight: 500;
				border-radius: 16rpx;
			}
		}
	}
</style>