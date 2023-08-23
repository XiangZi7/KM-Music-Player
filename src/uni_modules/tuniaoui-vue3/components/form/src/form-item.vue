<script lang="ts" setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  toRefs,
  useSlots,
} from 'vue'
import { formItemContextKey } from '../../../tokens'
import { formItemProps } from './form-item'
import {
  useFormItemCustomStyle,
  useFormItemOperation,
  useFormSize,
} from './composables'

import type { FormItemContext } from './types'

const props = defineProps(formItemProps)

const slots = useSlots()

const {
  formContext,
  validateState,
  validateMessage,
  hasLabel,
  currentLabel,
  shouldShowError,
  isRequired,
  resetField,
  clearValidate,
  validate,
  initFieldValue,
} = useFormItemOperation(props, slots)
const {
  ns: formItemNs,
  labelId,
  formItemClass,
  formItemLabelClass,
  formItemLabelStyle,
  formItemErrorMessageStyle,
  initLabelContainerWidth,
} = useFormItemCustomStyle(props, hasLabel, isRequired)
const _size = useFormSize(undefined, { formItem: false })

const context: FormItemContext = reactive({
  ...toRefs(props),
  size: _size,
  validateState,
  hasLabel,
  resetField,
  clearValidate,
  validate,
})

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initFieldValue()
  }
  nextTick(() => {
    initLabelContainerWidth()
  })
})

onBeforeUnmount(() => {
  formContext?.removeField(context)
})

provide(formItemContextKey, context)

defineExpose({
  /**
   * @description 表单尺寸
   */
  size: _size,
  /**
   * @description 校验信息
   */
  validateMessage,
  /**
   * @description 校验状态
   */
  validateState,
  /**
   * @description 对表单Item的内容进行验证。 接收一个回调函数或返回Promise
   */
  validate,
  /**
   * @description 重置当前字段信息
   */
  resetField,
  /**
   * @description 清除表单字段验证
   */
  clearValidate,
})
</script>

<template>
  <view :class="[formItemClass]">
    <view :class="[formItemNs.e('wrapper')]">
      <!-- label -->
      <view
        v-if="hasLabel"
        :id="labelId"
        :class="[formItemLabelClass]"
        :style="formItemLabelStyle"
      >
        <slot name="label">
          {{ currentLabel }}
        </slot>
      </view>
      <!-- 表单组件 -->
      <view :class="[formItemNs.e('content')]">
        <slot />
      </view>
    </view>
    <!-- 错误信息 -->
    <view
      v-if="shouldShowError"
      class="tn-red_text"
      :class="[formItemNs.e('error-message')]"
      :style="formItemErrorMessageStyle"
    >
      {{ validateMessage }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/form-item.scss';
</style>
