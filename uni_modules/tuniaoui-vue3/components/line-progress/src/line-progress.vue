<script lang="ts" setup>
import { lineProgressProps } from './line-progress'
import { useLineProgressCustomStyle } from './composables'

const props = defineProps(lineProgressProps)
const {
  ns,
  progressClass,
  progressStyle,
  activeProgressClass,
  activeProgressStyle,
} = useLineProgressCustomStyle(props)
</script>

<template>
  <view :class="[progressClass]" :style="progressStyle">
    <!-- 进度 -->
    <view :class="[activeProgressClass]" :style="activeProgressStyle">
      <view
        v-if="showPercent || $slots.default"
        class="tn-text-ellipsis-1"
        :class="[ns.e('percent-value')]"
      >
        <slot> {{ percent }}% </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/line-progress.scss';
</style>
