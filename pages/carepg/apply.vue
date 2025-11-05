<template>
	<view class="page-container">
		<view class="top-box">
			<view class="title">基本资料</view>
			<view class="item">
				<view class="item-label">*真实姓名</view>
				<up-input class="item-input" placeholder="请输入内容" border="surround" v-model="pageData.name"></up-input>
			</view>
			<view class="item">
				<view class="item-label">*身份证号</view>
				<up-input class="item-input" placeholder="请输入内容" border="surround" v-model="pageData.id"></up-input>
			</view>
		</view>
		<view class="kyc-box">
			<view class="title">身份证正反面</view>
			<view class="upload-group">
				<ImgUploader :maxCount="1" v-model:fileList="pageData.idFront" @afterRead="uploadFile" />
				<ImgUploader :maxCount="1" v-model:fileList="pageData.idBack" @afterRead="uploadFile2" />
			</view>
		</view>
		
		<view class="kyc-box">
			<view class="title">健康证</view>
			<view class="upload-group">
				<ImgUploader :maxCount="1" v-model:fileList="pageData.healCard" @afterRead="uploadFile3" />
			</view>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="label">*健康证过期时间:</view>
				<view class="item-r">
					<up-input class="item-input" placeholder="请填写健康证过期时间" border="surround" v-model="pageData.healCardTime"></up-input>
					<up-icon name="arrow-right" size="24rpx" color="#999"></up-icon>
				</view>
			</view>
			<view class="item">
				<view class="label">*所在区域:</view>
				<view class="item-r">
					<view class="content">
						<text class="val" v-if="pageData.address">{{pageData.address}}</text>
						<text class="tips" v-else>请选择所在区域</text>
					</view>
					<up-icon name="arrow-right" size="24rpx" color="#999"></up-icon>
				</view>
			</view>
			<view class="item">
				<view class="label">*详细地址:</view>
				<view class="item-r">
					<up-input class="item-input" placeholder="请输入详细地址" border="surround" v-model="pageData.addressDetail"></up-input>
					<up-icon name="arrow-right" size="24rpx" color="#999"></up-icon>
				</view>
			</view>
		</view>
		
		<view class="tips-box">
			<up-icon name="error-circle" size="32rpx" color="#FF4B4B"></up-icon>
			<text>注意!填写的地址为接单地址，接单范围为接单地址的附近10公里，请谨慎填写，否则影响接单范围。</text>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="label">*手机号:</view>
				<view class="item-r">
					<up-input class="item-input" placeholder="请输入手机号" border="surround" v-model="pageData.mobile"></up-input>
					<up-code :seconds="pageData.seconds" @end="end" @start="start" ref="uCodeRef" @change="codeChange"></up-code>
					<up-button class="u-code-button" @tap="getCode">{{pageData.tips}}</up-button>
				</view>
			</view>
			<view class="item">
				<view class="label">*验证码:</view>
				<view class="item-r">
					<up-input class="item-input" placeholder="请填写验证码" border="surround" v-model="pageData.healCardTime"></up-input>
					<up-icon name="arrow-right" size="24rpx" color="#999"></up-icon>
				</view>
			</view>
		</view>
		
		<view class="footer">
			<view class="top">
				<up-checkbox-group activeColor="#FEE126" size="14" labelSize="14">
					<up-checkbox labelSize="14px" v-model="pageData.checked" shape="circle" label="阅读并同意"></up-checkbox>
				</up-checkbox-group>
				<text class="text-link">《洗护师洗护管理规则》</text>
			</view>
			
			<u-button :disabled="submitDisabled" type="primary" color="#FEE126" :customStyle="{color: '#000', fontWeight: 500}" @click="handleSubmit" shape="circle">立即预约</u-button>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, computed } from "vue"
	import KycUploader from '@/components/KycUploader.vue';
	import ImgUploader from '@/components/ImgUploader.vue';
	const uCodeRef = ref(null);
	
	const pageData = reactive({
		name: '',
		id: null,
		idFront:[],
		idBack: [],
		healCard: [],
		healCardTime: '',
		address: '',
		addressDetail: '',
		mobile: '',
		tips: '',
		seconds: 10,
		checked: false,
	})
	
	const submitDisabled = computed(()=>{
		if(!pageData.name || !pageData.id) return true;
		return false
	})
	
	const idCardFront = ref([]);
	
	const uploadFile = (file) => {
		console.log('选择文件：', file);
		// 这里可以调用 uni.uploadFile 上传到服务器
	};
	
	const uploadFile2 = (file) => {
		console.log('选择文件：', file);
	};
	
	const uploadFile3 = (file) => {
		console.log('选择文件：', file);
	};
	
	const deleteFile = (key) => (index) => {
		form.value[key].splice(index, 1);
	};
	
	
	const codeChange = (text) => {
	  pageData.tips = text;
	};
	
	const getCode = () => {
	  if (uCodeRef.value && uCodeRef.value.canGetCode) {
	    // 模拟向后端请求验证码
	    uni.showLoading({
	      title: '正在获取验证码',
	    });
	    setTimeout(() => {
	      uni.hideLoading();
	      // 这里此提示会被start()方法中的提示覆盖
		  uni.showToast({title:'验证码已发送'});
	      // 通知验证码组件内部开始倒计时
	      uCodeRef.value.start();
	    }, 2000);
	  } else {
		uni.showToast({title:'倒计时结束后再发送'});
	  }
	};
	
	const end = () => {};
	
	const start = () => {
	  uni.showToast({title:'验证码已发送'});
	};
	
	
	const handleSubmit = async() => {
		
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #f8f8f8;
	}
	.page-container{
		font-weight: 500;
		color: #354D6E;
		font-size: 28rpx;
		.top-box{
			background: #fff;
			padding: 40rpx;
			.title{
				margin-bottom: 20rpx;
			}
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 16rpx;
				margin-bottom: 24rpx;
			}
			.item-label{
				font-size: 24rpx;
				flex-shrink: 0;
			}
			.item-input {
				border: 2rpx rgba(221, 221, 221, 1) solid;
				font-size: 24rpx;
			}
		}
		
		.kyc-box{
			background: #fff;
			padding: 40rpx;
			margin-top: 20rpx;
			.title{
				margin-bottom: 40rpx;
			}
			.upload-group{
				display: flex;
				align-items: center;
				gap: 40rpx;
			}
		}
		
		.list{
			background: #fff;
			margin-top: 20rpx;
			.item{
				display: flex;
				align-items: center;
				padding: 40rpx;
				border-bottom: 2rpx solid #F2F2F2;
				gap: 12rpx;
				.label{
					font-size: 24rpx;
					flex-shrink: 0;
				}
				.content{
					padding-left: 20rpx;
					flex: 1;
				}
				.tips{
					font-size: 24rpx;
					color: #c0c4cc;
				}
				 .item-r{
					 flex: 1;
					 display: flex;
					 justify-content: space-between;
					 align-items: center;
					 .item-input{
						 flex: 1;
					 }
					 .u-code-button{
						 width: 180rpx;
						 font-size: 20rpx;
						 color: #354D6E;
						 background:#FEE126;
						 border: none;
						 border-radius: 16rpx;
						 height: 78rpx;
					 }
				 }
			}
		}
		
		.tips-box{
			padding: 40rpx;
			display: flex;
			gap: 10rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #666;
		}
		
		.footer{
			padding: 20rpx 40rpx;
			display: flex;
			flex-direction: column;
			gap: 40rpx;
			.top{
				display: flex;
				align-items: center;
				.text-link{
					color: #4794FF;
				}
			}
		}
	}
</style>