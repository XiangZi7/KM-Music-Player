import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue, isEmpty } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { ButtonProps } from '../button'

export const useButtonCustomStyle = (props: ButtonProps) => {
  const ns = useNamespace('button')
  // 解析背景颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )
  // 解析字体颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )
  // 解析边框颜色
  const [borderColorClass, borderColorStyle] = useComponentColor(
    toRef(props, 'borderColor'),
    'border'
  )
  // 解析阴影颜色
  const [shadowColorClass, shadowColorStyle] = useComponentColor(
    toRef(props, 'shadowColor'),
    'shadow'
  )
  // 按钮动态类
  const buttonClass = computed<string>(() => {
    const cls: string[] = []
    cls.push(ns.b())

    // 设置文字按钮
    if (props.text) cls.push(ns.m('text'))

    // 设置朴素按钮
    if (props.plain) {
      cls.push(ns.m('plain'))
      if (props.borderBold) cls.push(ns.m('plain-bold'))
    }

    // 设置按钮颜色类型
    if (props.type) {
      if (props.text) {
        if (!props.textColor) cls.push(`tn-type-${props.type}_text`)
      } else if (props.plain) {
        if (!props.borderColor) cls.push(`tn-type-${props.type}_border`)
      } else {
        if (!props.bgColor) cls.push(`tn-type-${props.type}_bg`)
      }
    }

    // 设置按钮尺寸
    if (props.size) cls.push(ns.m(props.size))

    // 设置按钮形状
    if (!props.text && props.shape) cls.push(ns.m(props.shape))

    // 设置字体是否加粗
    if (props.bold) cls.push('tn-text-bold')

    // 设置背景颜色
    if (!props.text && !props.plain) {
      if (bgColorClass.value) cls.push(bgColorClass.value)
    }

    // 设置字体颜色
    if (textColorClass.value) cls.push(textColorClass.value)

    if (props.plain) {
      // 设置边框颜色
      if (borderColorClass.value) cls.push(borderColorClass.value)
    }

    // 设置阴影信息
    if (props.shadow) {
      cls.push('tn-shadow')
      // 设置阴影颜色
      if (shadowColorClass.value) cls.push(shadowColorClass.value)
    }
    if (props.customClass) cls.push(props.customClass)
    return cls.join(' ')
  })

  // 按钮样式
  const buttonStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    // 设置按钮宽高
    if (props.width) {
      style.width = formatDomSizeValue(props.width)
      if (props.shape === 'circle') style.height = style.width
    }
    if (props.height && props.shape !== 'circle')
      style.height = formatDomSizeValue(props.height)

    // 设置按钮字体大小
    if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)

    // 设置背景颜色
    if (!props.text && !props.plain) {
      if (bgColorStyle.value) style.backgroundColor = bgColorStyle.value
    }

    // 设置字体颜色
    if (textColorStyle.value) {
      style.color = textColorStyle.value
    }

    // 设置边框颜色
    if (props.plain && borderColorStyle.value) {
      style.borderColor = borderColorStyle.value
    }

    // 设置阴影颜色
    if (props.shadow && shadowColorStyle.value)
      style.boxShadow = shadowColorStyle.value

    if (!isEmpty(props.customStyle)) {
      Object.assign(style, props.customStyle)
    }
    return style
  })

  return {
    ns,
    buttonClass,
    buttonStyle,
  }
}
