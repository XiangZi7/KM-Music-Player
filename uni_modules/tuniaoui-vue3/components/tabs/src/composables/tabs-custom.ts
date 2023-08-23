import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { TabsProps } from '../tabs'

export const useTabsCustomStyle = (props: TabsProps) => {
  const ns = useNamespace('tabs')

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )
  const [barColorClass, barColorStyle] = useComponentColor(
    toRef(props, 'barColor'),
    'bg'
  )

  // tabs对应的类
  const tabsClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置底部阴影
    if (props.bottomShadow) cls.push(ns.m('bottom-shadow'))

    // 设置背景颜色
    if (bgColorClass.value) cls.push(bgColorClass.value)

    return cls.join(' ')
  })
  // tabs的样式
  const tabsStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置背景颜色
    if (!bgColorClass.value) {
      style.backgroundColor = bgColorStyle.value || 'var(--tn-color-white)'
    }

    // 设置高度
    if (props.height) {
      style.height = formatDomSizeValue(props.height)
      if (props.offsetTop) {
        style.height = `calc(${style.height} + ${props.offsetTop}px)`
      }
    }

    return style
  })

  // bar对应的类
  const barClass = computed<string>(() => {
    const cls: string[] = [ns.e('bar')]
    // 设置滑块颜色
    if (barColorClass.value) cls.push(barColorClass.value)

    return cls.join(' ')
  })
  // bar的样式
  const barStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置滑块颜色
    if (!barColorClass.value) {
      style.backgroundColor = barColorStyle.value || 'var(--tn-color-primary)'
    }

    // 设置滑块的宽度
    if (props.barWidth) style.width = formatDomSizeValue(props.barWidth)

    return style
  })

  return {
    ns,
    tabsClass,
    tabsStyle,
    barClass,
    barStyle,
  }
}
