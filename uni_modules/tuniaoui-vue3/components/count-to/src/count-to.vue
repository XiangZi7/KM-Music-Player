<script lang="ts" setup>
import { countToEmits, countToProps } from './count-to'
import { useCountTo, useCountToCustomStyle } from './composables'

const props = defineProps(countToProps)
const emits = defineEmits(countToEmits)

const { countToClass, countToStyle } = useCountToCustomStyle(props)
const { content } = useCountTo(props, emits)
</script>

<template>
  <view :class="[countToClass]" :style="countToStyle">
    {{ content }}
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk//src/count-to.scss';
</style>
