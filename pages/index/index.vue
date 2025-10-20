<template>
	<view class="index">
		<view class="list-box">
			<view class="list-item" v-for="(item,idx) in list" :key="idx">
				<image :src="item.url" mode="widthFix"></image>
			</view>
		</view>
		<custom-tabbar :current="0" />
	</view>
	
</template>

<script>
	import CustomTabbar from "@/components/custom-tabbar.vue";
	export default {
		components: { CustomTabbar },
		data() {
			return {
				title: 'Hello',
				list: [
					{
						url: '/static/tabbar/list-01.png'
					},
					{
						url: '/static/tabbar/list-02.png'
					}
				]
			}
		},
		onLoad() {
			this.getOrders()
		},
		methods: {
			getOrders(){
				uni.request({
					url: 'http://192.168.31.14:3000/api/orders/listAll',
					method: 'GET',
					success:(res)=>{
						console.log(res)
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: rgba(248, 248, 248, 1);
	}
	
	.index{
		.list-box{
			display: flex;
			flex-direction:  column;
			padding: 20rpx;
			image{
				width: 100%;
			}
		}
	}
</style>
