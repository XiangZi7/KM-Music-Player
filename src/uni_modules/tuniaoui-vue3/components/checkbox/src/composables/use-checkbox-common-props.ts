import { computed, inject } from 'vue'
import { checkboxGroupKey } from '../../../../tokens'
import { useFormDisabled, useFormSize } from '../../../form'
import { isEmptyDoubleVariableInDefault } from '../../../../utils'

import type { CheckboxProps } from '../checkbox'

export const useCheckboxCommonProps = (props: CheckboxProps) => {
  const checkboxGroup = inject(checkboxGroupKey, undefined)

  // 组件尺寸
  const size = useFormSize(
    computed(() =>
      isEmptyDoubleVariableInDefault(props?.size, checkboxGroup?.size)
    )
  )

  // 复选框选框的形状
  const checkedShape = computed(() =>
    isEmptyDoubleVariableInDefault(
      props?.checkedShape,
      checkboxGroup?.checkedShape,
      'square'
    )
  )

  // 是否禁用
  const disabled = useFormDisabled(
    computed(() => props?.disabled || checkboxGroup?.disabled || false)
  )

  const maxDisabled = computed(
    () =>
      checkboxGroup?.modelValue &&
      checkboxGroup?.max &&
      checkboxGroup?.modelValue.length >= checkboxGroup?.max &&
      !checkboxGroup?.modelValue.includes(props.label!)
  )

  // 禁止点击标签进行选择
  const labelDisabled = computed(
    () => props?.labelDisabled || checkboxGroup?.labelDisabled || false
  )

  // 是否显示边框
  const border = computed(() => props?.border || checkboxGroup?.border || false)

  // radio激活时的颜色
  const activeColor = computed(
    () => props?.activeColor || checkboxGroup?.activeColor
  )

  return {
    checkboxGroup,
    size,
    checkedShape,
    disabled,
    maxDisabled,
    labelDisabled,
    border,
    activeColor,
  }
}
