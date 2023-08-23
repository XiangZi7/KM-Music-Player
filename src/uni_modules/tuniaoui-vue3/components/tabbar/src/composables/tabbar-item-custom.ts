import { computed, inject, toRef } from 'vue'
import { tabbarContextKey } from '../../../../tokens'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { TabbarItemProps } from '../tabbar-item'
import type { TabbarItemRect } from '../types'

type TabbarItemElementStyleValue = (type: 'icon' | 'text') => CSSProperties

type TabbarItemBulgeElementStyleValue = (
  rectInfo: TabbarItemRect
) => CSSProperties

export const useTabbarItemCustomStyle = (
  props: TabbarItemProps,
  isActive: Ref<boolean>
) => {
  const ns = useNamespace('tabbar-item')
  const tabbarContext = inject(tabbarContextKey)

  const activeColor = computed<string | undefined>(
    () => props.activeColor || tabbarContext?.activeColor
  )
  const inactiveColor = computed<string | undefined>(
    () => props.inactiveColor || tabbarContext?.inactiveColor
  )

  // 解析颜色
  const [inactiveColorClass, inactiveColorStyle] = useComponentColor(
    inactiveColor,
    'text'
  )
  const [activeColorClass, activeColorStyle] = useComponentColor(
    activeColor,
    'text'
  )
  const [inactiveBgClass, inactiveBgStyle] = useComponentColor(
    inactiveColor,
    'bg'
  )
  const [activebgClass, activebgStyle] = useComponentColor(activeColor, 'bg')
  const [bulgeBgClass, bulgeBgStyle] = useComponentColor(
    toRef(props, 'bulgeBgColor'),
    'bg'
  )
  const [bulgeTextColorClass, bulgeTextColorStyle] = useComponentColor(
    toRef(props, 'bulgeTextColor'),
    'text'
  )

  // 文字尺寸
  const fontSize = computed<string>(() =>
    formatDomSizeValue(props.fontSize || tabbarContext?.fontSize || '')
  )

  // tabbarItem对应的类
  const tabbarItemClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置文字，图标颜色
    if (isActive.value) {
      if (activeColorClass.value) cls.push(activeColorClass.value)
    } else {
      if (inactiveColorClass.value) cls.push(inactiveColorClass.value)
    }

    // 判断是否只有图标或者文字
    if (
      (props.icon && props.activeIcon && !props.text) ||
      (props.text && !props.icon && !props.activeIcon)
    )
      cls.push(ns.is('only-element'))

    // 选中的状态
    if (isActive.value) cls.push(ns.is('active'))
    // 点击切换是是否有动画
    if (tabbarContext?.switchAnimation) cls.push(ns.is('animation'))

    return cls.join(' ')
  })
  // tabbarItem对应的样式
  const tabbarItemStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置文字，图标颜色
    if (isActive.value) {
      if (!activeColorClass.value)
        style.color = activeColorStyle.value || 'var(--tn-color-primary)'
    } else {
      if (!inactiveColorClass.value)
        style.color = inactiveColorStyle.value || 'var(--tn-color-gray)'
    }

    return style
  })

  // tabbarItem元素对应的样式
  const tabbarItemElementStyle = computed<TabbarItemElementStyleValue>(() => {
    return (type: 'icon' | 'text') => {
      const style: CSSProperties = {}

      // 设置文字尺寸
      if (type === 'text') {
        if (fontSize.value) style.fontSize = fontSize.value
      }

      return style
    }
  })

  // 凸起按钮对应的类
  const bulgeClass = computed<string>(() => {
    const cls: string[] = [ns.e('bulge')]
    // 设置背景颜色
    if (isActive.value) {
      if (bulgeBgClass.value) cls.push(bulgeBgClass.value)
      else if (activebgClass.value) cls.push(activebgClass.value)
    } else {
      if (inactiveBgClass.value) cls.push(inactiveBgClass.value)
    }

    // 设置文字颜色
    if (bulgeTextColorClass.value) cls.push(bulgeTextColorClass.value)

    return cls.join(' ')
  })
  // 凸起按钮对应的样式
  const bulgeStyle = computed<TabbarItemBulgeElementStyleValue>(() => {
    return (rectInfo: TabbarItemRect) => {
      const style: CSSProperties = {}

      // 设置容器信息
      let width = rectInfo.width
      if (rectInfo?.maxWidth) {
        width = rectInfo.maxWidth
      }
      style.width = `${width * 0.5}px`
      style.height = style.width
      style.top = `-${width * 0.16}px`

      // 设置背景
      if (isActive.value) {
        if (!activebgClass.value && !bulgeBgClass.value) {
          style.backgroundColor =
            bulgeBgStyle.value ||
            activebgStyle.value ||
            'var(--tn-color-primary)'
        }
      } else {
        if (!inactiveBgClass.value) {
          style.backgroundColor =
            inactiveBgStyle.value || 'var(--tn-color-gray)'
        }
      }

      // 设置文字颜色
      if (bulgeTextColorStyle.value) style.color = bulgeTextColorStyle.value

      return style
    }
  })

  return {
    ns,
    tabbarItemClass,
    tabbarItemStyle,
    tabbarItemElementStyle,
    bulgeClass,
    bulgeStyle,
  }
}
