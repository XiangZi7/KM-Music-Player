<script lang="ts" setup>
import { provide, reactive, toRefs } from 'vue'
import { checkboxGroupKey } from '../../../tokens'
import { useNamespace } from '../../../hooks'
import { checkboxGroupEmits, checkboxGroupProps } from './checkbox-group'
import { useCheckboxGroup } from './composables'

const props = defineProps(checkboxGroupProps)
const emits = defineEmits(checkboxGroupEmits)

const ns = useNamespace('checkbox-group')

const { changeEvent } = useCheckboxGroup(props, emits)

provide(
  checkboxGroupKey,
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
@import '../../../theme-chalk/src/checkbox-group.scss';
</style>
