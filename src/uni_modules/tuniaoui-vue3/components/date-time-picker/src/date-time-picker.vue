<script lang="ts" setup>
import TnPicker from '../../picker/src/picker.vue'
import { dateTimePickerEmits, dateTimePickerProps } from './date-time-picker'
import { useDateTimePicker } from './composables'

const props = defineProps(dateTimePickerProps)
defineEmits(dateTimePickerEmits)

const {
  pickerRef,
  showPicker,
  pickerData,
  pickerSelectData,
  handlePickerCloseEvent,
  initDateTimePicker,
  pickerValueChangeEvent,
  handlePickerConfirmEvent,
  handlePickerCancelEvent,
} = useDateTimePicker(props)

initDateTimePicker()
</script>

<template>
  <TnPicker
    ref="pickerRef"
    v-model:open="showPicker"
    :model-value="pickerSelectData"
    :data="pickerData"
    :show-cancel="showCancel"
    :show-confirm="showConfirm"
    :mask="mask"
    :cancel-text="cancelText"
    :cancel-color="cancelColor"
    :confirm-text="confirmText"
    :confirm-color="confirmColor"
    :z-index="zIndex"
    @change="pickerValueChangeEvent"
    @confirm="handlePickerConfirmEvent"
    @cancel="handlePickerCancelEvent"
    @close="handlePickerCloseEvent"
  />
</template>

<style lang="scss" scoped></style>
