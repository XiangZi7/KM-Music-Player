<script lang="ts" setup>
import { stickyEmits, stickyProps } from './sticky'
import { useSticky, useStickyCustomStyle } from './composables'

const props = defineProps(stickyProps)
defineEmits(stickyEmits)

const {
  componentId,
  supportCSSSticky,
  stickyStatus,
  stickyDistance,
  stickyContainerRect,
} = useSticky(props)
const { ns, stickyStyle, stickyContentStyle } = useStickyCustomStyle(
  props,
  supportCSSSticky,
  stickyDistance,
  stickyStatus,
  stickyContainerRect
)
</script>

<template>
  <view :id="componentId" :class="[ns.b()]" :style="stickyStyle">
    <view :class="[ns.e('content')]" :style="stickyContentStyle">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/sticky.scss';
</style>
