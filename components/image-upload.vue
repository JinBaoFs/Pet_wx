<template>
  <view class="upload-box">
    <!-- 已上传图片 -->
    <view v-for="(item, index) in modelValue" :key="index" class="upload-item">
      <image
        :src="item.url"
        mode="aspectFill"
        class="upload-img"
        @tap="previewImage(index)"
      />
      <view class="delete-btn" @tap.stop="deleteImage(index)">×</view>
      <view v-if="item.uploading" class="progress">{{ item.progress }}%</view>
    </view>

    <!-- 上传按钮 -->
    <view
      v-if="modelValue.length < maxCount"
      class="upload-add"
      @tap="chooseImage"
    >
      +
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  uploadUrl: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: 'file'
  },
  maxCount: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['update:modelValue', 'success', 'fail'])

// 选择图片
const chooseImage = () => {
  const remain = props.maxCount - props.modelValue.length
  if (remain <= 0) return

  uni.chooseImage({
    count: remain,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      res.tempFilePaths.forEach((path) => uploadImage(path))
    }
  })
}

// 上传图片
const uploadImage = (filePath) => {
  const newItem = { url: filePath, uploading: true, progress: 0 }
  const newList = [...props.modelValue, newItem]
  emit('update:modelValue', newList)
  const index = newList.length - 1

  const uploadTask = uni.uploadFile({
    url: props.uploadUrl,
    filePath,
    name: props.name,
    formData: { token: props.token },
    success: (res) => {
      try {
        const data = JSON.parse(res.data)
        newList[index].url = data.url
        newList[index].uploading = false
        emit('update:modelValue', newList)
        emit('success', data)
      } catch (e) {
        emit('fail', e)
      }
    },
    fail: (err) => {
      uni.showToast({ title: '上传失败', icon: 'none' })
      newList.splice(index, 1)
      emit('update:modelValue', newList)
      emit('fail', err)
    }
  })

  uploadTask.onProgressUpdate((progress) => {
    newList[index].progress = progress.progress
    emit('update:modelValue', [...newList])
  })
}

// 预览
const previewImage = (index) => {
  uni.previewImage({
    urls: props.modelValue.map((i) => i.url),
    current: props.modelValue[index].url
  })
}

// 删除
const deleteImage = (index) => {
  const newList = [...props.modelValue]
  newList.splice(index, 1)
  emit('update:modelValue', newList)
}
</script>

<style scoped>
.upload-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.upload-item {
  position: relative;
}
.upload-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.upload-add {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(221, 221, 221, 1);
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
}
.delete-btn {
  position: absolute;
  right: 8rpx;
  top: 8rpx;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 40rpx;
  font-size: 28rpx;
}
.progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 24rpx;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 0 0 12rpx 12rpx;
}
</style>
