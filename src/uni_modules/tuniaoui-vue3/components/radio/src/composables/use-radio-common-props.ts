import { computed, inject } from 'vue'
import { radioGroupKey } from '../../../../tokens'
import { isEmptyDoubleVariableInDefault } from '../../../../utils'
import { useFormDisabled, useFormSize } from '../../../form'

import type { RadioProps } from '../radio'

export const useRadioCommonProps = (props: RadioProps) => {
  const radioGroupContext = inject(radioGroupKey, undefined)

  // radio当选框尺寸
  const size = useFormSize(
    computed(() =>
      isEmptyDoubleVariableInDefault(props?.size, radioGroupContext?.size)
    )
  )

  // radio单选框是否禁用
  const disabled = useFormDisabled(
    computed(() => props?.disabled || radioGroupContext?.disabled || false)
  )

  // radio禁止点击标签进行选择
  const labelDisabled = computed(
    () => props?.labelDisabled || radioGroupContext?.labelDisabled || false
  )

  // 是否显示边框
  const border = computed(
    () => props?.border || radioGroupContext?.border || false
  )

  // radio激活时的颜色
  const activeColor = computed(
    () => props?.activeColor || radioGroupContext?.activeColor
  )

  return {
    radioGroupContext,
    size,
    disabled,
    labelDisabled,
    border,
    activeColor,
  }
}
