<script lang="ts" setup>
import {} from 'vue'
import { overlayEmits, overlayProps } from './overlay'
import { useOverlay } from './composables'

const props = defineProps(overlayProps)
const emits = defineEmits(overlayEmits)

const { overlayClass, overlayStyle, overlayClick } = useOverlay(props, emits)
</script>

<template>
  <view
    :class="[overlayClass]"
    :style="overlayStyle"
    @tap.stop="overlayClick"
    @touchmove.stop.prevent="() => {}"
  >
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/overlay.scss';
</style>
