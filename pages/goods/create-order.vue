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
			<up-cell isLink :border="false" class="cell-item" title="*上门服务时间" is-link @click="otherData.dateTimePickShow = true"
				:value="formatTimestampToYMDH(pageData.serverTime) || '未选择'"></up-cell>
			<up-datetime-picker :show="otherData.dateTimePickShow" v-model="pageData.serverTime"
				:minDate="otherData.minDate" :maxDate="otherData.maxDate" :filter="timeFilter"
				@cancel="() => (otherData.dateTimePickShow = false)"
				@confirm="serverDateConfirm"
				mode="datetime"
				confirmColor="#FFB10C"
			></up-datetime-picker>

			<!-- 洗护师选择 -->
			<up-cell isLink :border="false" class="cell-item" title="*洗护师" is-link @click="handleOpenCare"
				:value="pageData.careId ? `${pageData.careId}号` : '未选择'"></up-cell>
				
			<up-popup :show="otherData.carePopupShow" mode="bottom"  @close="otherData.carePopupShow = false">
				<view class="care-container">
					<view class="care-title">选择空闲洗护师</view>
					<template v-if="!otherData.careLoading">
						<view class="care-list" v-if="otherData.careList && otherData.careList.length">
							<view class="care-item" v-for="(item,idx) in otherData.careList" :key="idx" @click="handleSelectCare(item)">
								<view class="item-l">
									<view class="idx">{{item.id}}号</view>
									<view class="logo"></view>
								</view>
								<view class="item-c">
									累计订单：110
								</view>
								<view class="item-r">
									<view class="see-btn">选择</view>
								</view>
							</view>
						</view>
						<view class="empty" v-else>
							很抱歉，您选择的时间暂无空闲洗护师，或您所选择的地址洗护师紧缺，您换个时间或者换个位置再试试哦~
						</view>
					</template>
					<view class="loading-container" v-else>
						<up-loading-icon mode="semicircle" color="#FFB10C"></up-loading-icon>
					</view>
				</view>
			</up-popup>
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

			<view class="pet-item">
				<view class="item-label">*宠物图片</view>
				<div class="upload-container">
					<ImageUpload v-model="images" :upload-url="uploadUrl" :max-count="1" token="test-token"
						@success="onSuccess" />
				</div>
			</view>
		</view>

		<view class="desc-container">
			<div class="desc-title">洗护注意事项（备注）</div>
			<up-textarea v-model="pageData.description" placeholder="请输入内容"></up-textarea>
		</view>

		<!-- 底部提交 -->
		<view class="footer">
			<u-button type="primary" color="#FEE126" :customStyle="{color: '#000', fontWeight: 500}" @click="submitOrder" shape="circle">立即预约</u-button>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		useCreateOrder
	} from '@/stores/order.js'
	import ImageUpload from '@/components/image-upload.vue'
	const createOrderStore = useCreateOrder()

	const images = ref([])
	const uploadUrl = 'https://your-server.com/upload'

	const onSuccess = (data) => {
		console.log('上传成功：', data)
	}
	const submit = () => {
		console.log('最终图片数据:', images.value)
	}

	const pageData = reactive({
		serverTime: null,
		description: '',
		careId: null,
	})

	const otherData = reactive({
		minDate: Date.now() + 2 * 60 * 60 * 1000,
		maxDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
		dateTimePickshow: false,
		carePopupShow: false,
		careList: [], // 空闲洗护师
		careLoading: false,
	})

	// 核心：过滤小时选项
	const timeFilter = (type, options) => {
		if (!options || options.length === 0) return options
		if (type === 'hour') {
			const filtered = options.filter(opt => {
				const hour = Number(opt)
				return (hour >= 7 && hour <= 18 && hour % 2 != 0)
			})
			return filtered.length ? filtered : options
		}
		
		if(type === 'minute') return ['00']
		return options
	}
	
	//格式化日期
	const formatTimestampToYMDH = (timestamp) => {
		if(!timestamp) return timestamp;
		
	    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
	    const year = date.getFullYear();
	    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
	    const day = String(date.getDate()).padStart(2, '0');
	    const hour = String(date.getHours()).padStart(2, '0');
	    return `${year}/${month}/${day} ${Number(hour)}:00~${Number(hour)+2}:00`;
	}

	
	const serverDateConfirm = (e) => {
	  pageData.serverTime = e.value
	  otherData.dateTimePickShow = false
	}
	
	const handleOpenCare = () => {
		otherData.careLoading = true;
		otherData.carePopupShow = true;
		setTimeout(()=>{
			otherData.careList = [{id:5},{id:23},{id:72}]
			otherData.careLoading = false;
		},500)
	}
	
	const handleSelectCare = (item) => {
		pageData.careId = item.id;
		otherData.carePopupShow = false;
	}


	// 监听页面返回时的地址更新
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
		uni.navigateTo({
			url: '/pages/user/address?type=1',
			success: (res) => {
				// 接收从子页返回的数据
				res.eventChannel.on('returnAddress', (data) => {
					address.value = data
				})
			}
		})
	}

	const submitOrder = () => {
		uni.showToast({
			title: '提交订单',
			icon: 'success'
		})
	}

	const onPickerChange = (val) => {

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

		.picker-container {
			flex: 1;
			border: 2rpx rgba(221, 221, 221, 1) solid;
			font-size: 24rpx;
			height: 76rpx;
			border-radius: 8rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.tips {
				color: rgb(192, 196, 204);
			}
		}

		.upload-container {
			flex: 1;
		}

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
		padding: 10rpx 200rpx;
	}

	.desc-container {
		background-color: #fff;
		margin-top: 20rpx;
		padding: 20rpx;

		.desc-title {
			margin-bottom: 20rpx;
			color: #354D6E;
			font-size: 28rpx;
			font-weight: 500;

		}
	}


	.care-container{
		padding: 20rpx;
		min-height: 400rpx;
		.care-title{
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #354D6E;
			margin-bottom: 20rpx;
		}
		
		.care-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx #eee solid;
			padding: 20rpx 0;
			.item-l{
				font-size: 28rpx;
				color: #354D6E;
				font-weight: 500;
				display: flex;
				align-items: center;
				gap: 12rpx;
				flex-shrink: 0;
				.idx{
					width: 100rpx;
				}
				.logo{
					width: 80rpx;
					height: 80rpx;
					background: #FFB10C;
					border-radius: 50%;
				}
			}
			.item-c{
				font-size: 24rpx;
				flex: 1;
				color: #354D6E;
				font-weight: 500;
				padding-left: 20rpx;
			}
			.item-r{
				display: flex;
				align-items: center;
				flex-shrink: 0;
				.see-btn{
					background: #FFB10C;
					padding: 10rpx 30rpx;
					border-radius: 40rpx;
					color: #fff;
					font-size: 24rpx;
				}
			}
		}
		.loading-container{
			display: flex;
			justify-content: center;
			padding: 120rpx;
		}
		.empty{
			padding: 50rpx 100rpx;
			text-align: center;
			font-size: 24rpx;
			color: #999;
		}
	}
	.total {
		font-weight: bold;
		font-size: 16px;
	}
</style>