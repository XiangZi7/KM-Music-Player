<script lang="ts" setup>
import TnPicker from '../../picker/src/picker.vue'
import { regionPickerEmits, regionPickerProps } from './region-picker'
import { useRegionPicker } from './composables'

const props = defineProps(regionPickerProps)
const emits = defineEmits(regionPickerEmits)

const {
  pickerSelectData,
  showPicker,
  currentSelectValue,
  handlePickerCloseEvent,
  handlePickerChangeEvent,
  handlePickerConfirmEvent,
  handlePickerCancelEvent,
} = useRegionPicker(props, emits)
</script>

<template>
  <TnPicker
    v-model:open="showPicker"
    :model-value="currentSelectValue"
    :data="pickerSelectData"
    label-key="name"
    value-key="code"
    :show-cancel="showCancel"
    :show-confirm="showConfirm"
    :mask="mask"
    :cancel-text="cancelText"
    :cancel-color="cancelColor"
    :confirm-text="confirmText"
    :confirm-color="confirmColor"
    :z-index="zIndex"
    @close="handlePickerCloseEvent"
    @change="handlePickerChangeEvent"
    @confirm="handlePickerConfirmEvent"
    @cancel="handlePickerCancelEvent"
  />
</template>

<style lang="scss" scoped></style>
