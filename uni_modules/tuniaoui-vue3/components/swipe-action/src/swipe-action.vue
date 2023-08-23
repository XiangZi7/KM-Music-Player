<script lang="ts" setup>
import { useNamespace } from '../../../hooks'
import { swipeActionEmits, swipeActionProps } from './swipe-action'
import { useSwipeAction } from './composables'

const props = defineProps(swipeActionProps)
const emits = defineEmits(swipeActionEmits)

const ns = useNamespace('swipe-action')

useSwipeAction(props, emits)
</script>

<template>
  <view :class="[ns.b()]">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import './../../../theme-chalk/src/swipe-action.scss';
</style>
