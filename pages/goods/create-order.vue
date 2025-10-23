<template>
	<view class="page-container">

		<!-- 顶部商品信息 -->
		<view class="goods-card">
			<view class="goods-info">
				<image src="/static/tabbar/list-01.png" mode="widthFix" class="goods-img"></image>
				<view class="goods-text">
					<view class="goods-title">狗狗上门洗</view>
					<view class="goods-subtitle">已选：请填写地址，小型犬（5kg以下）</view>
					<view class="goods-price">￥{{createOrderStore.orderInfo.price}}</view>
				</view>
			</view>
		</view>

		<up-cell-group>
			<!-- 地址选择 -->
			<up-cell isLink :border="false" class="cell-item" title="*请填写上门服务地址" is-link @click="chooseAddress"
				:value="address || '未选择'"></up-cell>

			<!-- 上门服务时间 -->
			<up-cell isLink :border="false" class="cell-item" title="*上门服务时间" is-link @click="chooseStaff"
				:value="staff || '未选择'"></up-cell>

			<!-- 洗护师选择 -->
			<up-cell isLink :border="false" class="cell-item" title="*洗护师" is-link @click="chooseCleaner"
				:value="cleaner || '未选择'"></up-cell>
		</up-cell-group>

		<!-- 宠物信息补充 -->
		<view class="pet-card">
			<view class="pet-item">
				<view class="title">宠物信息补充</view>
				<view class="sel-btn com-btn">从我的宠物选择</view>
			</view>
			<view class="pet-item">
				<view class="item-label">*宠物名称</view>
				<up-input class="item-input" placeholder="请输入内容" border="surround" v-model="petName"></up-input>
			</view>
			<picker :range="options" @change="onPickerChange">
				<view class="pet-item">
					<view class="item-label">*宠物品种</view>
					<view class="picker-container">
						<text class="tips">请选择</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
			
			<picker :range="options" @change="onPickerChange">
				<view class="pet-item">
					<view class="item-label">*宠物毛色</view>
					<view class="picker-container">
						<text class="tips">请选择</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
			
			<picker :range="options" @change="onPickerChange">
				<view class="pet-item">
					<view class="item-label">*宠物年龄</view>
					<view class="picker-container">
						<text class="tips">请选择</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
			
			<picker :range="options" @change="onPickerChange">
				<view class="pet-item">
					<view class="item-label">*宠物性别</view>
					<view class="picker-container">
						<text class="tips">请选择</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
		</view>

		<!-- 备注 -->
		<u-textarea v-model="remark" placeholder="请填写注意事项（备注）" auto-height />

		<!-- 底部提交 -->
		<view class="footer">
			<view class="total">总价: ¥58</view>
			<u-button type="primary" @click="submitOrder">立即预约</u-button>
		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		useCreateOrder
	} from '@/stores/order.js'
	const createOrderStore = useCreateOrder()

	const address = ref('湖南省')
	const staff = ref('')
	const cleaner = ref('')
	const petType = ref('狗狗')
	const petBreed = ref('')
	const petName = ref('')
	const petColor = ref('')
	const petAge = ref('')
	const remark = ref('')
	
	const options = ['选项1', '选项2', '选项3']

	// 下拉选项
	const breedOptions = [{
			label: '哈士奇',
			value: '哈士奇'
		},
		{
			label: '泰迪',
			value: '泰迪'
		},
		{
			label: '拉布拉多',
			value: '拉布拉多'
		},
	]

	const colorOptions = [{
			label: '黑色',
			value: '黑色'
		},
		{
			label: '白色',
			value: '白色'
		},
		{
			label: '棕色',
			value: '棕色'
		},
	]

	const ageOptions = [{
			label: '1岁',
			value: '1'
		},
		{
			label: '2岁',
			value: '2'
		},
		{
			label: '3岁',
			value: '3'
		},
	]

	// 点击事件
	const chooseAddress = () => {
		uni.showToast({
			title: '选择地址',
			icon: 'none'
		})
	}

	const chooseStaff = () => {
		uni.showToast({
			title: '选择上门服务师',
			icon: 'none'
		})
	}

	const chooseCleaner = () => {
		uni.showToast({
			title: '选择洗护师',
			icon: 'none'
		})
	}

	const submitOrder = () => {
		uni.showToast({
			title: '提交订单',
			icon: 'success'
		})
	}
</script>

<style scoped lang="scss">
	.page-container {
		background-color: #f8f8f8;
		padding-bottom: 120rpx;
	}

	.goods-card {
		margin: 0 !important;
		background: #fff;
		padding: 20rpx 30rpx;
	}

	.goods-info {
		display: flex;
	}

	.goods-img {
		width: 220rpx;
	}

	.goods-text {
		flex: 1;
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goods-title {
		font-weight: bold;
		font-size: 16px;
		color: rgba(53, 77, 110, 1);
	}

	.goods-subtitle {
		font-size: 12px;
		color: #888;
	}

	.goods-price {
		color: #ff2d2d;
		font-weight: bold;
	}

	.cell-item {
		margin-top: 20rpx;
		background: #fff;
	}

	.pet-card {
		background: #fff;
		margin-top: 20rpx;
		padding: 20rpx;
	}

	.pet-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 24rpx;

		.title {
			font-size: 28rpx;
			font-weight: 500;
			color: rgba(53, 77, 110, 1);
		}

		.sel-btn {
			font-size: 24rpx;
		}

		.item-label {
			font-size: 24rpx;
			color: rgba(53, 77, 110, 1);
			flex-shrink: 0;
		}

		.item-input {
			border: 2rpx rgba(221, 221, 221, 1) solid;
			font-size: 24rpx;
		}
		
		.picker-container{
			flex: 1;
			border: 2rpx rgba(221, 221, 221, 1) solid;
			font-size: 24rpx;
			height: 76rpx;
			border-radius: 8rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.tips{
				color: rgb(192, 196, 204);
			}
		}

	}

	.radio-group {
		margin-bottom: 10px;
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		padding: 10px;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #eee;
	}

	.total {
		font-weight: bold;
		font-size: 16px;
	}
</style>