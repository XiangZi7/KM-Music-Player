import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'
import { usePopup } from './use-popup'

import type { CSSProperties } from 'vue'
import type { PopupProps } from '../popup'

export const usePopupCustomStyle = (props: PopupProps) => {
  const ns = useNamespace('popup')

  const { zIndex } = usePopup(props)

  // 内容背景颜色
  const [contentBgColorClass, contentBgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )

  // 内容所属类
  const popupContentClass = computed<string>(() => {
    const cls: string[] = [ns.e('content')]

    // 内容弹出位置
    if (props.openDirection) cls.push(ns.em('content', props.openDirection))

    // 如果是底部弹出，是否开启安全区域
    if (props.openDirection === 'bottom' && props.safeAreaInsetBottom) {
      cls.push('tn-u-safe-area')
    }

    // 内容背景颜色
    if (contentBgColorClass.value) cls.push(contentBgColorClass.value)

    return cls.join(' ')
  })

  // 内容所属样式
  const popupContentStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置背景颜色
    if (contentBgColorStyle.value)
      style.backgroundColor = contentBgColorStyle.value

    // 设置圆角
    if (props.radius) {
      // 如果有设置圆角则条件overflow:hidden
      style.overflow = 'hidden'
      // 根据不同的弹出位置设置圆角
      if (props.openDirection === 'center') {
        style.borderRadius = formatDomSizeValue(props.radius)
      }
      if (props.openDirection === 'top') {
        style.borderBottomLeftRadius = formatDomSizeValue(props.radius)
        style.borderBottomRightRadius = formatDomSizeValue(props.radius)
      }
      if (props.openDirection === 'left') {
        style.borderTopRightRadius = formatDomSizeValue(props.radius)
        style.borderBottomRightRadius = formatDomSizeValue(props.radius)
      }
      if (props.openDirection === 'right') {
        style.borderTopLeftRadius = formatDomSizeValue(props.radius)
        style.borderBottomLeftRadius = formatDomSizeValue(props.radius)
      }
      if (props.openDirection === 'bottom') {
        style.borderTopLeftRadius = formatDomSizeValue(props.radius)
        style.borderTopRightRadius = formatDomSizeValue(props.radius)
      }
    }

    // 设置距离顶部的距离
    if (
      props.top &&
      (props.openDirection === 'top' ||
        props.openDirection === 'left' ||
        props.openDirection === 'right')
    ) {
      style.top = formatDomSizeValue(props.top, 'px')
    }

    // 根据不同的位置设置不同的宽度或高度
    if (
      props.width &&
      (props.openDirection === 'left' ||
        props.openDirection === 'right' ||
        props.openDirection === 'center')
    ) {
      style.width = formatDomSizeValue(props.width)
    }
    if (
      props.height &&
      (props.openDirection === 'top' ||
        props.openDirection === 'bottom' ||
        props.openDirection === 'center')
    ) {
      style.height = formatDomSizeValue(props.height)
    }

    if (props.openDirection === 'left' || props.openDirection === 'right') {
      if (props.top)
        style.height = `calc(100% - ${formatDomSizeValue(props.top, 'px')})`
    }

    // 设置zIndex
    style.zIndex = zIndex.value

    return style
  })

  return {
    ns,
    popupContentClass,
    popupContentStyle,
  }
}
