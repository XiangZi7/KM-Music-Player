<script lang="ts" setup>
import { useNamespace } from '../../../hooks'
import { collapseEmits, collapseProps } from './collapse'
import { useCollapse } from './composables'

const props = defineProps(collapseProps)
const emits = defineEmits(collapseEmits)

const ns = useNamespace('collapse')

useCollapse(props, emits)
</script>

<template>
  <view :class="[ns.b()]">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/collapse.scss';
</style>
