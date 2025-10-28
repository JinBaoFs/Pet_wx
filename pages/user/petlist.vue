<template>
	<view class="pet-container">
		<view class="pet-list" v-if="petList && petList.length">
			<view class="pet-item" v-for="(item,idx) in petList">
				<view class="item-l">
					<view class="logo"></view>
					<view class="info">
						<view class="info-line">
							<text class="label font24 text-primary">宠物名称:</text>
							<text class="label font24 text-primary">{{item.name}}</text>
						</view>
						<view class="info-line">
							<text class="label font24 text-primary">宠物品种类:</text>
							<text class="label font24 text-primary">{{PET_CAT_TYPE_TEXT[item.type]}}</text>
						</view>
						<view class="info-line">
							<text class="label font24 text-primary">宠物毛色:</text>
							<text class="label font24 text-primary">{{COLOR_STATUS_TEXT[item.color]}}</text>
						</view>
						<view class="info-line">
							<text class="label font24 text-primary">宠物年龄:</text>
							<text class="label font24 text-primary">{{PET_AGE_TEXT[item.age]}}</text>
						</view>
						<view class="info-line">
							<text class="label font24 text-primary">宠物性别:</text>
							<text class="label font24 text-primary">{{GENDER_STATUS_TEXT[item.gender]}}</text>
						</view>
					</view>
				</view>
				<view class="item-tool">
					<view class="con-btn del-btn" v-if="!type" @click="handleDeletPet(item)">删除</view>
					<view class="con-btn edit-btn" v-if="!type">编辑</view>
					<view class="con-btn sel-btn" v-else @click="selectPet(item)">选择</view>
				</view>
			</view>
		</view>
		<view class="not-empty" v-if="!petList || !petList.length">
			暂无地址，请添加地址!
		</view>
		
		<view class="add-box">
			<view class="con-btn add-btn" @click="handleToAddPet">添加宠物</view>
		</view>
		
		<up-modal title="温馨提示" contentTextAlign="center" :showCancelButton="true" content="删除后不可恢复，确认要删除吗？" :show="modalShow" ref="uModal" :asyncClose="true">
			<template #confirmButton>
				<view class="cust-modal-btn-group">
					<u-button 
						plain 
						type="primary" 
						color="#FEE126" 
						:customStyle="{color: '#000', fontWeight: 500}" 
						shape="circle"
						@click="modalShow = false"
					>
						取消
					</u-button>
					<u-button 
						type="primary" 
						color="#FEE126" 
						:customStyle="{color: '#000', fontWeight: 500}" 
						shape="circle" 
						@click="confirm"
						:loading="delLoading"
						loading-color="#000000"
					>
						确定
					</u-button>
				</view>
			</template>
		</up-modal>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		getCurrentInstance
	} from 'vue'
	import { 
		PET_CAT_TYPE_TEXT,
		COLOR_STATUS_TEXT,
		PET_AGE_TEXT,
		GENDER_STATUS_TEXT
	} from "@/enum/index.js"
	
	const type = ref(null)
	const modalShow = ref(false)
	const rowData = ref({})
	const delLoading = ref(false)
	
	onLoad((options) => {
		type.value = options.type || null
	})
	
	onShow(()=>{
		console.log(type.value)
		init()
	})
	
	const petList = reactive([
		{
			id: 1,
			name: 'Lucky',
			type: 2,
			age: 2,
			color: 'WHITE',
			gender: 2,
		},
		{
			id: 2,
			name: 'Money',
			type: 1,
			age: 2,
			color: 'YELLOW',
			gender: 1,
		}
	])
	
	const instance = getCurrentInstance()
	const eventChannel = instance?.proxy?.getOpenerEventChannel()
	
	const selectPet = (item) => {
		eventChannel.emit('returnPet', item)
		uni.navigateBack()
	}
	
	const handleToAddPet = () => {
		uni.navigateTo({
			url: '/pages/user/addPet'
		})
	}
	
	const handleDeletPet = (item) => {
		rowData.value = {...item}
		modalShow.value = true
	}
	
	const confirm = () => {  
		console.log(rowData.value)
		delLoading.value = true;
	    setTimeout(() => {  
	        modalShow.value = false;  
			delLoading.value = false;
	    }, 3000);  
	}; 
	
	const init = async() => {
		uni.showLoading({title:'加载中...'})
		setTimeout(()=>{
			uni.hideLoading()
		},1000)
	}
</script>

<style lang="scss" scoped>
	page {
		background: rgba(248, 248, 248, 1);
	}
	.pet-container{
		.pet-list{
			.pet-item{
				background: #fff;
				margin-bottom: 20rpx;
				padding: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.item-l{
					display: flex;
					align-items: center;
					gap: 20rpx;
				}
				.logo{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					background: #eee;
				}
				
				.item-tool{
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 20rpx;
				}
			}
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