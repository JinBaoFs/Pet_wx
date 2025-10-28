<template>
	<view class="add-pet">
		<view class="add-container">
			<view class="pet-item">
				<view class="item-label">*宠物图片:</view>
				<div class="upload-container">
					<ImageUpload v-model="images" :upload-url="uploadUrl" :max-count="1" token="test-token" @success="onSuccess" />
				</div>
			</view>
			<view class="pet-item">
				<view class="item-label">*宠物类型:</view>
				<up-radio-group
				    v-model="pageData.petType"
				    placement="row"
					activeColor="#FEE126"
					size="16"
				  >
				    <up-radio label="猫猫" :name="1" labelSize="12"></up-radio>
					<up-radio label="狗狗" :name="2" labelSize="12"></up-radio>
				</up-radio-group>
			</view>
			<view class="pet-item">
				<view class="item-label">*宠物名称:</view>
				<up-input class="item-input" placeholder="请输入内容" border="surround" v-model="pageData.name"></up-input>
			</view>
			<picker :range="PET_CAT_TYPE_OPTIONS" range-key="label" @change="(e) => onPickerChange(e,'type',PET_CAT_TYPE_OPTIONS)">
				<view class="pet-item">
					<view class="item-label">*宠物品种</view>
					<view class="picker-container">
						<text class="font24" :class="PET_CAT_TYPE_TEXT[pageData.type] ? 'text-primary' : 'text-ple'">{{PET_CAT_TYPE_TEXT[pageData.type] || '请选择'}}</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
			
			<picker :range="COLOR_STATUS_OPTIONS" range-key="label"  @change="(e) => onPickerChange(e,'color',COLOR_STATUS_OPTIONS)">
				<view class="pet-item">
					<view class="item-label">*宠物毛色:</view>
					<view class="picker-container">
						<text class="font24" :class="COLOR_STATUS_TEXT[pageData.color] ? 'text-primary' : 'text-ple'">{{COLOR_STATUS_TEXT[pageData.color] || '请选择'}}</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
			
			<picker :range="PET_AGE_OPTIONS" range-key="label"  @change="(e) => onPickerChange(e,'age',PET_AGE_OPTIONS)">
				<view class="pet-item">
					<view class="item-label">*宠物年龄:</view>
					<view class="picker-container">
						<text class="font24" :class="PET_AGE_TEXT[pageData.age] ? 'text-primary' : 'text-ple'">{{PET_AGE_TEXT[pageData.age] || '请选择'}}</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
			
			<picker :range="GENDER_STATUS_OPTIONS" range-key="label"  @change="(e) => onPickerChange(e,'gender',GENDER_STATUS_OPTIONS)">
				<view class="pet-item">
					<view class="item-label">*宠物性别:</view>
					<view class="picker-container">
						<text class="font24" :class="GENDER_STATUS_TEXT[pageData.gender] ? 'text-primary' : 'text-ple'">{{GENDER_STATUS_TEXT[pageData.gender] || '请选择'}}</text>
						<up-icon name="arrow-down" size="24rpx" color="#999"></up-icon>
					</view>
				</view>
			</picker>
		</view>
		<view class="save-box">
			<view class="save-btn" @click="handleSave">保存</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow,
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		getCurrentInstance
	} from 'vue'
	import {
		PET_CAT_TYPE_OPTIONS,
		PET_CAT_TYPE_TEXT,
		COLOR_STATUS_OPTIONS,
		COLOR_STATUS_TEXT,
		PET_AGE_OPTIONS,
		PET_AGE_TEXT,
		GENDER_STATUS_OPTIONS,
		GENDER_STATUS_TEXT,
	} from "@/enum/index.js"
	import ImageUpload from '@/components/image-upload.vue'
	const images = ref([])
	const uploadUrl = 'https://your-server.com/upload'
	
	const pageData = reactive({
		imgUrl: '',
		petType: 1,
		name: null,
		color: null,
		age: null,
		gender: null,
	})
	
	/**
	 * Picker宠物信息选择
	 * params {e} 
	 * params {t} 类型
	 * params {arr} 原OPTIONS
	 */ 
	const onPickerChange = (e,t,arr)=>{
		const index = e.detail.value
		pageData[t] = arr[index].value
	}
	
	
	const onSuccess = (data) => {
		console.log('上传成功：', data)
	}
	const submit = () => {
		console.log('最终图片数据:', images.value)
	}
	
	const handleSave = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	page {
		background: rgba(248, 248, 248, 1);
	}
	
	.add-pet{
		.add-container{
			padding: 40rpx;
			background: #fff;
			
			.pet-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 16rpx;
				margin-bottom: 24rpx;
				.item-label {
					font-size: 24rpx;
					color: rgba(53, 77, 110, 1);
					flex-shrink: 0;
				}
				
				.item-input {
					border: 2rpx rgba(221, 221, 221, 1) solid;
					font-size: 24rpx;
				}
				
				.upload-container {
					flex: 1;
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