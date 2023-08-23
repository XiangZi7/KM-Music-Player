<script lang="ts" setup>
import { provide, reactive, toRefs } from 'vue'
import { useNamespace } from '../../../hooks'
import { radioGroupKey } from '../../../tokens'
import { radioGroupEmits, radioGroupProps } from './radio-group'
import { useRadioGroup } from './composables'

const props = defineProps(radioGroupProps)
const emits = defineEmits(radioGroupEmits)

const ns = useNamespace('radio-group')

const { changeEvent } = useRadioGroup(props, emits)

provide(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent,
  })
)
</script>

<template>
  <view :class="[ns.b(), ns.is('wrap', props.wrap)]">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/radio-group.scss';
</style>
