<script lang="ts" setup>
import { provide, reactive, toRefs, watch } from 'vue'
import { formContextKey } from '../../../tokens'
import { formEmits, formProps } from './form'
import { useForm, useFormCustomStyle } from './composables'

const props = defineProps(formProps)
const emits = defineEmits(formEmits)

const { formClass } = useFormCustomStyle()
const {
  addField,
  removeField,
  resetFields,
  clearValidate,
  validate,
  validateField,
} = useForm(props)

watch(
  () => props.rules,
  () => {
    if (props.validateOnRuleChange) validate()
  },
  {
    deep: true,
  }
)

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    emits,

    resetFields,
    clearValidate,
    validateField,
    addField,
    removeField,
  })
)

defineExpose({
  /**
   * @description 对整个表单的内容进行验证。 接收一个回调函数或返回Promise
   */
  validate,
  /**
   * @description 验证具体的某个字段
   */
  validateField,
  /**
   * @description 重置表单
   */
  resetFields,
  /**
   * @description 清除表单验证
   */
  clearValidate,
})
</script>

<template>
  <view :class="[formClass]">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/form.scss';
</style>
