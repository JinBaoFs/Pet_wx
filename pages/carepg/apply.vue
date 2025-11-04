<template>
	<view class="page-container">
		<view class="top">
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
	</view>
</template>

<script setup>
	import { reactive } from "vue"
	const pageData = reactive({
		name: '',
		id: null,
	})
</script>

<style scoped>
	page{
		background-color: #f8f8f8;
	}
	.page-container{
		
	}
</style>