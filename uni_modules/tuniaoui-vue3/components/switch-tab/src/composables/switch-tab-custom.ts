import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties } from 'vue'
import type { SwitchTabProps } from '../switch-tab'

export type tabClass = (index: number) => string
export type tabStyle = (index: number) => CSSProperties

export const useSwitchTabCustomStyle = (props: SwitchTabProps) => {
  const ns = useNamespace('switch-tab')

  // 解析颜色
  const [inactiveBgColorClass, inactiveBgColorStyle] = useComponentColor(
    toRef(props, 'inactiveBgColor'),
    'bg'
  )
  const [activeBgColorClass, activeBgColorStyle] = useComponentColor(
    toRef(props, 'activeBgColor'),
    'bg'
  )
  const [inactiveTextColorClass, inactiveTextColorStyle] = useComponentColor(
    toRef(props, 'inactiveTextColor'),
    'text'
  )
  const [activeTextColorClass, activeTextColorStyle] = useComponentColor(
    toRef(props, 'activeTextColor'),
    'text'
  )

  // 切换选项卡的类
  const switchTabClass = computed(() => {
    const cls: string[] = [ns.b()]

    if (activeBgColorClass.value) cls.push(activeBgColorClass.value)

    return cls.join(' ')
  })
  // 切换选项卡的样式
  const switchTabStyle = computed(() => {
    const style: CSSProperties = {}

    if (!activeBgColorClass.value) {
      style.backgroundColor =
        activeBgColorStyle.value || 'var(--tn-color-white)'
    }

    return style
  })

  // 标签的类
  const tabClass = computed<tabClass>(() => {
    return (index: number) => {
      const cls: string[] = [
        ns.e('tab'),
        ns.is('active', index === props.modelValue),
      ]

      if (index === props.modelValue) {
        if (activeBgColorClass.value) cls.push(activeBgColorClass.value)
        if (activeTextColorClass.value) cls.push(activeTextColorClass.value)
      } else {
        if (inactiveBgColorClass.value) cls.push(inactiveBgColorClass.value)
        if (inactiveTextColorClass.value) cls.push(inactiveTextColorClass.value)
      }

      return cls.join(' ')
    }
  })
  // 标签的样式
  const tabStyle = computed<tabStyle>(() => {
    return (index: number) => {
      const style: CSSProperties = {}

      if (index === props.modelValue) {
        if (!activeBgColorClass.value) {
          style.backgroundColor =
            activeBgColorStyle.value || 'var(--tn-color-white)'
        }
        if (activeTextColorStyle.value) {
          style.color = activeTextColorStyle.value
        } else if (!activeTextColorClass.value && !activeBgColorClass.value) {
          style.color = 'var(--tn-text-color-primary)'
        }
      } else {
        if (!inactiveBgColorClass.value) {
          style.backgroundColor =
            inactiveBgColorStyle.value || 'var(--tn-color-primary-light-7)'
        }
        if (inactiveTextColorStyle.value) {
          style.color = inactiveTextColorStyle.value
        } else if (
          !inactiveTextColorClass.value &&
          !inactiveBgColorClass.value
        ) {
          style.color = 'var(--tn-text-color-primary)'
        }
        if (index === props.modelValue - 1) {
          style.borderBottomRightRadius = '30rpx'
        }
        if (index === props.modelValue + 1) {
          style.borderBottomLeftRadius = '30rpx'
        }
      }

      return style
    }
  })

  return {
    ns,
    tabClass,
    tabStyle,
    switchTabClass,
    switchTabStyle,
  }
}
