<script lang="ts" setup>
import { nextTick, onMounted } from 'vue'
import { sliderEmits, sliderProps } from './slider'
import {
  useSlider,
  useSliderCustomStyle,
  useSliderNodeInfo,
} from './composables'

const props = defineProps(sliderProps)
defineEmits(sliderEmits)

const { isFormItem, sliderValue, mode } = useSlider(props)
const {
  sliderId,
  initSliderNodeInfo,
  onSliderBarTouchStart,
  onSliderBarTouchMove,
  onSliderBarTouchEnd,
  sliderClickEvent,
} = useSliderNodeInfo(props)
const {
  ns,
  sliderClass,
  sliderStyle,
  activeSliderClass,
  activeSliderStyle,
  sliderBarClass,
  sliderBarStyle,
} = useSliderCustomStyle(props, sliderValue, mode)

onMounted(() => {
  nextTick(() => {
    initSliderNodeInfo()
  })
})
</script>

<template>
  <view
    :id="sliderId"
    :class="[sliderClass, ns.is('form-item', isFormItem)]"
    :style="sliderStyle"
    @tap.stop="sliderClickEvent"
  >
    <!-- 激活时的滑动条 -->
    <view
      :class="[activeSliderClass]"
      :style="activeSliderStyle"
      @tap.stop="sliderClickEvent"
    />
    <!-- 开始滑块 -->
    <view
      :class="[sliderBarClass]"
      :style="sliderBarStyle('min')"
      @touchstart.prevent="onSliderBarTouchStart"
      @touchmove.prevent="onSliderBarTouchMove($event, 'min')"
      @touchend.prevent="onSliderBarTouchEnd($event, 'min')"
    />
    <!-- 结束滑块 -->
    <view
      v-if="mode === 'range'"
      :class="[sliderBarClass]"
      :style="sliderBarStyle('max')"
      @touchstart.prevent="onSliderBarTouchStart"
      @touchmove.prevent="onSliderBarTouchMove($event, 'max')"
      @touchend.prevent="onSliderBarTouchEnd($event, 'max')"
    />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/slider.scss';
</style>
