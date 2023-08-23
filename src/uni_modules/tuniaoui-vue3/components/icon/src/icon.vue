<script lang="ts" setup>
import { iconEmits, iconProps } from './icon'
import { useIcon } from './composables'
// 依赖tn-icon样式(由于uniapp在小程序端支持svg有点问题，所以这里还是使用iconfont)
// #ifdef APP-PLUS
import '../../../icon-source/https/index.css'
// #endif
// #ifndef APP-PLUS
import '../../../icon-source/index.css'
// #endif

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)

const { isImg, iconClass, iconStyle } = useIcon(props)

// 图标点击事件
const handleClick = () => {
  emits('click')
}
</script>

<template>
  <view :class="[iconClass]" :style="iconStyle" @click="handleClick">
    <!-- 图片图标 -->
    <image v-if="isImg" class="image" :src="name" :mode="imgMode" />
    <!-- 正常图标 -->
    <text v-else :class="['icon', `tn-icon-${name}`]" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/icon.scss';
</style>
