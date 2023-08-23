import { computed } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { isEmpty } from '../../../../utils'
import { useCheckboxCommonProps } from './use-checkbox-common-props'

import type { CSSProperties } from 'vue'
import type { CheckboxProps } from '../checkbox'

type selectedClass = (selected: boolean) => string
type selectedStyle = (selected: boolean) => CSSProperties

export const useCheckboxCustomStyle = (props: CheckboxProps) => {
  const ns = useNamespace('checkbox')

  const { activeColor, disabled, maxDisabled, size, border, checkedShape } =
    useCheckboxCommonProps(props)

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(activeColor, 'bg')
  const [textColorClass, textColorStyle] = useComponentColor(
    activeColor,
    'text'
  )
  const [borderColorClass, borderColorStyle] = useComponentColor(
    activeColor,
    'border'
  )

  // 复选框所属类
  const checkboxClass = computed<selectedClass>(() => {
    return (selected: boolean) => {
      const cls: string[] = [ns.b()]

      // 禁止选择
      if (disabled.value || maxDisabled.value) cls.push(ns.m('disabled'))

      // 设置尺寸
      if (size.value) cls.push(ns.m(size.value))

      // 激活样式
      if (selected) {
        cls.push(ns.m('selected'))
        if (textColorClass.value) cls.push(textColorClass.value)
      }

      // 设置激活时的边框颜色
      if (border.value) {
        cls.push('tn-border')
        if (selected && borderColorClass.value) cls.push(borderColorClass.value)
        else cls.push('tn-gray-disabled_border')
      }

      if (props.customClass) cls.push(props.customClass)
      return cls.join(' ')
    }
  })

  // 复选框所属样式
  const checkboxStyle = computed<selectedStyle>(() => {
    return (selected: boolean) => {
      const style: CSSProperties = {}

      // 设置激活时的颜色
      if (selected) {
        if (border.value && !borderColorClass.value)
          style.borderColor =
            borderColorStyle.value || 'var(--tn-color-primary)'
        if (!textColorClass.value) {
          style.color = textColorStyle.value || 'var(--tn-color-primary)'
        }
      }

      if (!isEmpty(props.customStyle)) Object.assign(style, props.customStyle)
      return style
    }
  })

  // 复选框选框所属类
  const checkboxCheckedBoxClass = computed<selectedClass>(() => {
    return (selected: boolean) => {
      const cls: string[] = [ns.e('checked-box')]

      // 复选框选框的形状
      if (checkedShape.value) cls.push(ns.em('checked-box', checkedShape.value))

      if (selected || props.indeterminate) {
        cls.push(ns.em('checked-box', 'selected'))
        if (bgColorClass.value) cls.push(bgColorClass.value)
      } else {
        cls.push('tn-border tn-gray-disabled_border')
      }
      return cls.join(' ')
    }
  })

  // 复选框选框所属样式
  const checkboxCheckedBoxStyle = computed<selectedStyle>(() => {
    return (selected: boolean) => {
      const style: CSSProperties = {}
      if ((selected || props.indeterminate) && !bgColorClass.value) {
        style.backgroundColor = bgColorStyle.value || 'var(--tn-color-primary)'
      }
      return style
    }
  })

  return {
    ns,
    checkboxClass,
    checkboxStyle,
    checkboxCheckedBoxClass,
    checkboxCheckedBoxStyle,
  }
}
