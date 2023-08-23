import { computed, toRef } from 'vue'
import { useFormSize } from '../../../form'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue, isEmpty } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { InputProps } from '../input'
import type { FormItemValidateStates } from '../../../form'

export const useInputCustomStyle = (
  props: InputProps,
  validateState: Ref<FormItemValidateStates>,
  disabled: Ref<boolean>
) => {
  const ns = useNamespace('input')

  // 输入框的尺寸
  const inputSize = useFormSize(props.size)

  // 解析边框颜色
  const [borderColorClass, borderColorStyle] = useComponentColor(
    toRef(props, 'borderColor'),
    'border'
  )

  // 输入框placeholder样式
  const placeholderStyle = computed<string>(() => {
    const style: CSSProperties = {
      color: 'var(--tn-text-color-secondary)',
    }

    if (!isEmpty(props.placeholderStyle))
      Object.assign(style, props.placeholderStyle)

    return Object.entries(style)
      .map(([key, value]) => `${key}:${value}`)
      .join(';')
  })

  // 输入框所属类
  const inputClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 禁止输入
    if (disabled.value && props.type !== 'select') cls.push(ns.m('disabled'))

    // 设置边框尺寸
    if (inputSize.value) cls.push(ns.m(inputSize.value))

    // 设置文字对齐方式
    if (props.textAlign) cls.push(ns.m(`text-${props.textAlign}`))

    // 是否发生错误
    if (validateState.value === 'error') cls.push(ns.m('error'))

    // 设置边框
    if (props.border || validateState.value === 'error') {
      cls.push('tn-border')
      if (validateState.value === 'error') cls.push('tn-red_border')
      else if (borderColorClass.value) cls.push(borderColorClass.value)
    }

    if (props.customClass) cls.push(props.customClass)

    return cls.join(' ')
  })

  // 输入框样式
  const inputStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置高度
    if (props.height) style.height = formatDomSizeValue(props.height)

    // 设置边框颜色
    if (
      props.border &&
      borderColorStyle.value &&
      validateState.value !== 'error'
    )
      style.borderColor = borderColorStyle.value

    if (!isEmpty(props.customStyle)) Object.assign(style, props.customStyle)

    return style
  })

  return {
    ns,
    inputClass,
    inputStyle,
    placeholderStyle,
  }
}
