<template>
	<view class="img-uploader">
		<!-- 已上传图片列表 -->
		<view class="img-list">
			<view
				v-for="(item, index) in innerFileList"
				:key="index"
				class="img-item"
			>
				<image
					:src="item.url || item.path"
					mode="aspectFill"
					class="img-preview"
					:style="{ width: width + 'px', height: height + 'px' }"
					@click="handlePreview(item)"
				/>
				<view class="delete-btn" @click.stop="handleDelete(index)">×</view>
			</view>

			<!-- 上传按钮插槽 -->
			<up-upload
				v-if="innerFileList.length < maxCount"
				:fileList="[]"
				@afterRead="handleAfterRead"
				:multiple="true"
				:maxCount="maxCount - innerFileList.length"
				:width="width"
				:height="height"
				:disabled="disabled"
			>
				<slot name="upload">
					<!-- 默认插槽内容 -->
					<view
						class="default-upload"
						:style="{ width: width + 'px', height: height + 'px' }"
					>
						<up-icon name="plus-circle" size="48rpx" color="#354D6E"></up-icon>
					</view>
				</slot>
			</up-upload>
		</view>

		<!-- 预览弹窗 -->
		<up-overlay :show="previewVisible" @click="previewVisible = false">
			<image
				v-if="previewUrl"
				:src="previewUrl"
				mode="widthFix"
				class="preview-img"
			/>
		</up-overlay>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	fileList: { type: Array, default: () => [] },
	maxCount: { type: Number, default: 6 },
	width: { type: Number, default: 100 },
	height: { type: Number, default: 100 },
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:fileList', 'afterRead', 'delete']);

const innerFileList = ref([...props.fileList]);

watch(
	() => props.fileList,
	(val) => {
		innerFileList.value = [...val];
	},
	{ deep: true }
);

const previewVisible = ref(false);
const previewUrl = ref('');

// 上传逻辑
const handleAfterRead = async (event) => {
	let files = Array.isArray(event.file) ? event.file : [event.file];
	uni.showLoading({ title: '上传中...' });

	// 模拟上传成功
	setTimeout(() => {
		uni.hideLoading();
		const uploaded = files.map((f) => ({ url: f.url || f.path }));
		innerFileList.value.push(...uploaded);
		emit('update:fileList', innerFileList.value);
		emit('afterRead', uploaded);
	}, 800);
};

// 删除逻辑
const handleDelete = (index) => {
	innerFileList.value.splice(index, 1);
	emit('update:fileList', innerFileList.value);
	emit('delete', index);
};

// 预览逻辑
const handlePreview = (item) => {
	previewUrl.value = item.url;
	previewVisible.value = true;
};
</script>

<style scoped>
.img-uploader {
	display: flex;
	flex-direction: column;
}

.img-list {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
}

.img-item {
	position: relative;
}

.img-preview {
	border-radius: 12rpx;
	object-fit: cover;
}

.delete-btn {
	position: absolute;
	top: -10rpx;
	right: -10rpx;
	width: 40rpx;
	height: 40rpx;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	font-size: 28rpx;
	text-align: center;
	line-height: 40rpx;
	border-radius: 50%;
}

.default-upload {
	/* border: 2rpx dashed #ccc; */
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #EBEBEB;
}

.plus {
	font-size: 80rpx;
	color: #bbb;
}

.preview-img {
	width: 90%;
	margin: 100rpx auto 0;
	display: block;
	border-radius: 20rpx;
}
</style>
