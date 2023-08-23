<script lang="ts" setup>
import { subsectionEmits, subsectionProps } from './subsection'
import { useSubsection, useSubsectionCustomStyle } from './composables'

const props = defineProps(subsectionProps)
const emits = defineEmits(subsectionEmits)

const { componentId, activeColor, sliderRectInfo } = useSubsection(props, emits)
const {
  ns,
  subsectionClass,
  subsectionStyle,
  subsectionSliderClass,
  subsectionSliderStyle,
} = useSubsectionCustomStyle(props, activeColor, sliderRectInfo)
</script>

<template>
  <view :id="componentId" :class="[subsectionClass]" :style="subsectionStyle">
    <!-- 滑块 -->
    <view :class="[subsectionSliderClass]" :style="subsectionSliderStyle" />
    <!-- 内容区域 -->
    <view :class="[ns.e('content')]">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/subsection.scss';
</style>
