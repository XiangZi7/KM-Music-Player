import { computed, toRef } from 'vue'
import { formatDomSizeValue, isEmpty } from '../../../../utils'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { useSwitchCommonProps } from './use-switch-common-props'

import type { CSSProperties, Ref } from 'vue'
import type { SwitchProps } from '../switch'

export const useSwitchCustomStyle = (
  props: SwitchProps,
  selected: Ref<boolean>
) => {
  const ns = useNamespace('switch')

  const { size, disabled } = useSwitchCommonProps(props)

  // 解析颜色
  const [activeBgColorClass, activeBgColorStyle] = useComponentColor(
    toRef(props, 'activeColor'),
    'bg'
  )
  const [inactiveBgColorClass, inactiveBgColorStyle] = useComponentColor(
    toRef(props, 'inactiveColor'),
    'bg'
  )
  const [activeTextColorClass, activeTextColorStyle] = useComponentColor(
    toRef(props, 'activeColor'),
    'text'
  )
  const [inactiveTextColorClass, inactiveTextColorStyle] = useComponentColor(
    toRef(props, 'inactiveColor'),
    'text'
  )

  // switch所属类
  const switchClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // switch的形状
    if (props.shape) cls.push(ns.m(props.shape))

    // switch的尺寸
    if (size.value) cls.push(ns.m(size.value))

    // 禁止状态
    if (disabled.value) cls.push(ns.m('disabled'))

    // 设置switch按钮的激活与未激活状态的颜色
    if (selected.value) {
      if (activeBgColorClass.value) cls.push(activeBgColorClass.value)
      if (activeTextColorClass.value) cls.push(activeTextColorClass.value)
    } else {
      if (inactiveBgColorClass.value) cls.push(inactiveBgColorClass.value)
      if (inactiveTextColorClass.value) cls.push(inactiveTextColorClass.value)
    }

    if (props.customClass) cls.push(props.customClass)
    return cls.join(' ')
  })

  // switch所属样式
  const switchStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置switch按钮的宽度
    if (props.width) style.width = formatDomSizeValue(props.width)

    // 设置switch按钮的激活与未激活状态的颜色
    if (selected.value) {
      if (activeBgColorStyle.value || !activeBgColorClass.value) {
        style.backgroundColor =
          activeBgColorStyle.value || 'var(--tn-color-primary)'
      }
      if (activeTextColorStyle.value) {
        style.color = activeTextColorStyle.value
      }
    } else {
      if (inactiveBgColorStyle.value || !inactiveBgColorClass.value) {
        style.backgroundColor =
          inactiveBgColorStyle.value || 'var(--tn-color-gray-disabled)'
      }
      if (inactiveTextColorStyle.value) {
        style.color = inactiveTextColorStyle.value
      }
    }

    if (!isEmpty(props.customStyle)) Object.assign(style, props.customStyle)
    return style
  })

  return {
    ns,
    switchClass,
    switchStyle,
  }
}
