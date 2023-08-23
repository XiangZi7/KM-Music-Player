<script lang="ts" setup>
import { circleProgressProps } from './circle-progress'
import { useCircleProgress } from './composables'

const props = defineProps(circleProgressProps)
const { ns, canvasId, radius, activeCircleColor } = useCircleProgress(props)
</script>

<template>
  <view
    :class="[ns.b()]"
    :style="{
      width: `${radius * 2}px`,
      height: `${radius * 2}px`,
      color: activeCircleColor,
    }"
  >
    <!-- 默认圆环 -->
    <canvas :id="canvasId" :class="[ns.e('canvas')]" :canvas-id="canvasId" />
    <!-- 数值 -->
    <view v-if="showPercent || $slots.default" :class="[ns.e('precent-value')]">
      <slot> {{ percent }}% </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/circle-progress.scss';
</style>
