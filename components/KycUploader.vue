<template>
	<view class="kyc-uploader">
		<up-upload
			:fileList="innerFileList"
			@afterRead="handleAfterRead"
			@delete="handleDelete"
			:multiple="false"
			:maxCount="maxCount"
			:width="width"
			:height="height"
			:disabled="disabled"
		>
			<image
				:src="placeholder || defaultPlaceholder"
				mode="widthFix"
				:style="{ width: width + 'px', height: height + 'px' }"
			></image>
		</up-upload>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	title: { type: String, default: '上传证件照' },
	fileList: { type: Array, default: () => [] },
	maxCount: { type: Number, default: 1 },
	width: { type: Number, default: 250 },
	height: { type: Number, default: 150 },
	placeholder: { type: String, default: '' },
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:fileList', 'afterRead', 'delete']);

const innerFileList = ref([...props.fileList]);
const defaultPlaceholder = 'https://cdn.uviewui.com/uview/demo/upload/positive.png';

watch(
	() => props.fileList,
	(val) => {
		innerFileList.value = [...val];
	},
	{ deep: true }
);

const handleAfterRead = (event) => {
	const { file } = event;
	console.log('上传文件:', file);
	emit('afterRead', file);
};

const handleDelete = (event) => {
	const { index } = event;
	console.log('删除索引:', index);
	emit('delete', index);
};
</script>

<style scoped>
.kyc-uploader {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 20rpx;
}
.kyc-title {
	font-size: 28rpx;
	margin-bottom: 10rpx;
	color: #333;
}
</style>
