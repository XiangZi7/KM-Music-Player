import { computed } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { isEmpty } from '../../../../utils'
import { useRadioCommonProps } from './use-radio-common-props'

import type { CSSProperties } from 'vue'
import type { RadioProps } from '../radio'

export const useRadioCustomStyle = (props: RadioProps) => {
  const ns = useNamespace('radio')

  const { size, disabled, border, activeColor } = useRadioCommonProps(props)

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

  // radio所属类
  const radioClass = computed<(selected: boolean) => string>(() => {
    return (selected: boolean) => {
      const cls: string[] = [ns.b()]

      // 禁止选择
      if (disabled.value) cls.push(ns.m('disabled'))

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

  // radio所属样式
  const radioStyle = computed<(selected: boolean) => CSSProperties>(() => {
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

  // radio选中点所属类
  const radioDotClass = computed<(selected: boolean) => string>(() => {
    return (selected: boolean) => {
      const cls: string[] = [ns.e('dot')]
      if (selected) {
        cls.push(ns.em('dot', 'selected'))
        if (bgColorClass.value) cls.push(bgColorClass.value)
      } else {
        cls.push('tn-border tn-gray-disabled_border')
      }
      return cls.join(' ')
    }
  })

  // radio选中点所属样式
  const radioDotStyle = computed<(selected: boolean) => CSSProperties>(() => {
    return (selected: boolean) => {
      const style: CSSProperties = {}
      if (selected && !bgColorClass.value) {
        style.backgroundColor = bgColorStyle.value || 'var(--tn-color-primary)'
      }
      return style
    }
  })

  return {
    ns,
    radioClass,
    radioStyle,
    radioDotClass,
    radioDotStyle,
  }
}
