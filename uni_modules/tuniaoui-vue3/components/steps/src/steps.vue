<script lang="ts" setup>
import { stepsEmits, stepsProps } from './steps'
import { useSteps, useStepsCustomStyle } from './composables'

const props = defineProps(stepsProps)
defineEmits(stepsEmits)

useSteps(props)
const { ns } = useStepsCustomStyle()
</script>

<template>
  <view :class="[ns.b()]">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/steps.scss';
</style>
