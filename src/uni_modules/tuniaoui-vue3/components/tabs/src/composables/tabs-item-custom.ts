import { computed, inject } from 'vue'
import { tabsContextKey } from '../../../../tokens'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue, isEmptyVariableInDefault } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { TabsItemProps } from '../tabs-item'

export const useTabsItemCustomStyle = (
  props: TabsItemProps,
  isActive: Ref<boolean>
) => {
  const ns = useNamespace('tabs-item')

  const tabsContext = inject(tabsContextKey)

  const normalColor = computed<string | undefined>(
    () => props.color || tabsContext?.color
  )
  const activeColor = computed<string | undefined>(
    () => props.activeColor || tabsContext?.activeColor
  )
  const activeBold = computed<boolean>(() =>
    isEmptyVariableInDefault(tabsContext?.activeBold, true)
  )

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    normalColor,
    'text'
  )
  const [activeTextColorClass, activeTextColorStyle] = useComponentColor(
    activeColor,
    'text'
  )

  // tabsItem对应的类
  const tabsItemClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置颜色
    if (isActive.value) {
      if (activeTextColorClass.value) {
        cls.push(activeTextColorClass.value)
      }
      if (activeBold.value) {
        cls.push(ns.m('bold'))
      }
    } else {
      if (textColorClass.value) {
        cls.push(textColorClass.value)
      }
    }

    // 设置可以滚动
    if (tabsContext?.scroll) cls.push(ns.m('scroll'))

    return cls.join(' ')
  })
  // tabsItem样式
  const tabsItemStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置颜色
    if (isActive.value) {
      if (!activeTextColorClass.value) {
        style.color = activeTextColorStyle.value || 'var(--tn-color-primary)'
      }
    } else {
      if (!textColorClass.value) {
        style.color = textColorStyle.value || 'var(--tn-text-color-primary)'
      }
    }

    // 设置字体大小
    if (props.fontSize || tabsContext?.fontSize) {
      style.fontSize = formatDomSizeValue(
        props.fontSize || tabsContext?.fontSize || ''
      )
    }

    return style
  })

  return {
    ns,
    tabsItemClass,
    tabsItemStyle,
  }
}
