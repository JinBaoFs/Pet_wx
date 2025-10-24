<template>
	<view class="goods-detail">
		<view class="img-box">
			<image :src="infoData.url" mode="widthFix"></image>
		</view>
		<view class="c-box">
			<text class="title">洗护类型</text>
			<view class="list">
				<view class="item" 
					v-for="(item,idx) in infoData.configs" 
					:key="idx" 
					:class="selectData.type == item.type ? 'item-active' : ''"
					@click="handleChangeType(item.type)"
				>
					{{item.typeMessage}}
				</view>
			</view>
		</view>
		
		<view class="c-box weight-box">
			<text class="title">体重大小</text>
			<view class="list">
				<view 
					class="item" v-for="(item,idx) in currentTypeInfo" 
					:key="idx" 
					:class="selectData.weight == item.value ? 'item-active' : ''"
					@click="handleChangeWeight(item.value)"
				>
					{{item.label}}
				</view>
			</view>
		</view>
		
		<view class="price-box">
			<text class="tips">已选择: {{ currentWeightOption.label || '--' }}</text>
			<view class="info">
				<text class="value">{{ currentWeightOption.price || '--' }}</text>
				<view class="order-btn" :class=" !currentWeightOption.price ? 'disabled-btn' : ''" @click="handleSubmit">立即下单</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useCreateOrder } from '@/stores/order.js'
	const createOrderStore = useCreateOrder()
	
	
	const infoData = ref({
		url: '/static/tabbar/list-01.png',
		title: '猫猫上门洗护',
		goodsId: 756,
		configs: [
			{
				typeMessage: '普通洗护',
				type: 1,
				info:[
					{ value: 1, label: '<3KG', price: 58 },
					{ value: 2, label: '3~8KG', price: 78},
					{ value: 3, label: '8~15KG', price: 128},
					{ value: 4, label: '15~30KG', price: 188}
				]
			},
			{
				typeMessage: '高端洗护',
				type: 2,
				info:[
					{ value: 1, label: '<3KG', price: 88 },
					{ value: 2, label: '3~8KG', price: 98},
					{ value: 3, label: '8~15KG', price: 178},
					{ value: 4, label: '15~30KG', price: 218}
				]
			}
		]
	})
	
	let selectData = ref({
		id: 756,
		type: 1,
		weight: null,
	})
	
	// 计算属性：根据 selectData.type 找到对应的 info 数组
	const currentTypeInfo = computed(() => {
	  const config = infoData.value.configs.find(item => item.type === selectData.value.type)
	  return config ? config.info : []
	})
	
	// 计算属性：找到当前选中的重量选项
	const currentWeightOption = computed(() => {
	  const info = currentTypeInfo.value
	  return info.find(item => item.value === selectData.value.weight) || {}
	})
	
	// 修改类型
	const handleChangeType = (val) => {
		selectData.value.type = val
		selectData.value.weight = null
	}
	
	// 修改体重
	const handleChangeWeight = (val) => {
		selectData.value.weight = val
	}
	
	// 下单提交
	const handleSubmit = () => {
		if(!selectData.value.weight){
			uni.showToast({title:"请选择宠物体重", icon: "none"});
			return
		}
		
		createOrderStore.setOrderInfo({
			...selectData.value,
			weightLabel: currentWeightOption.value.label,
			price: currentWeightOption.value.price,
		})
		
		uni.navigateTo({ url:'/pages/goods/create-order'})
	}
	
	// 生命周期函数
	onLoad(() => {
	  console.log('页面加载完成')
	})
</script>

<style lang="scss" scoped>
	page{
		background: rgba(248, 248, 248, 1);
	}
	.goods-detail{
		padding: 40rpx 40rpx 140rpx 40rpx;
		.img-box{
			image{
				width: 100%;
			}
		}
		
		.c-box{
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.11);
			border-radius: 16rpx;
			padding: 40rpx 20rpx;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30rpx;
			.title{
				font-size: 28rpx;
				color: rgba(53, 77, 110, 1);
				text-align: center;
				font-weight: 500;
			}
			
			.list{
				display: flex;
				gap: 80rpx;
				.item{
					border: 2rpx solid #FFD111;
					width: 200rpx;
					height: 72rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					border-radius: 88rpx;
					font-size: 12px;
					color: rgba(53, 77, 110, 1);
				}
				.item-active{
					background: linear-gradient(180deg, #FFD111 0%, #FEE126 47.46%);
					color: #000;
				}
			}
		}
		.weight-box{
			.list{
				flex-wrap: wrap;
				justify-content: center;
				gap: 40rpx;
				.item{
					width: 240rpx;
				}
			}
		}
		
		.price-box{
			background: #fff;
			display: flex;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			height: 120rpx;
			left: 0;
			width: 100%;
			padding: 16rpx 36rpx; 
			align-items: center;
			box-sizing: border-box;
			.tips{
				color: rgba(53, 77, 110, 1);
				font-size: 28rpx;
			}
			
			.info{
				display: flex;
				align-items: center;
				gap: 20rpx;
				.value{
					color: rgba(255, 75, 75, 1);
					font-size: 44rpx;
					font-weight: 500;
					&::before{
						content: '￥';
						font-size: 28rpx;
					}
				}
				.order-btn{
					padding: 16rpx 40rpx;
					border-radius: 40rpx;
					background: #FEE126;
					font-size: 28rpx;
					font-weight: 500;
				}
				
				.disabled-btn{
					background: #f8f8f8;
					color: #999;
				}
			}
		}
	}
</style>
