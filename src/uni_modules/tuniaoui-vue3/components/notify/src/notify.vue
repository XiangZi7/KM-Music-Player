<script lang="ts" setup>
import { notifyProps } from './notify'
import { useNotify, useNotifyCustomStyle } from './composables'

const props = defineProps(notifyProps)

const { options, isActive, showNotify } = useNotify()
const { notifyClass, notifyStyle } = useNotifyCustomStyle(
  props,
  options,
  isActive
)

defineExpose({
  /**
   * @description: 显示通知
   */
  show: showNotify,
})
</script>

<template>
  <view :class="[notifyClass]" :style="notifyStyle">
    {{ options.msg }}
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/notify.scss';
</style>
