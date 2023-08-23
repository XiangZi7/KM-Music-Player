import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue, isEmpty } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { ListProps } from '../list-item'

export const useListCustomStyle = (props: ListProps) => {
  const ns = useNamespace('list-item')

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )
  const [rightIconColorClass, rightIconColorStyle] = useComponentColor(
    toRef(props, 'rightIconColor'),
    'text'
  )

  // list对应的类
  const listClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置颜色
    if (bgColorClass.value) cls.push(bgColorClass.value)
    if (textColorClass.value) cls.push(textColorClass.value)

    // 设置圆角
    if (props.radius) cls.push(ns.m('radius'))

    // 自定义类
    if (props.customClass) cls.push(props.customClass)

    return cls.join(' ')
  })
  // list对应的样式
  const listStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置宽高
    if (props.width) style.width = formatDomSizeValue(props.width)
    if (props.height) style.height = formatDomSizeValue(props.height)

    // 设置颜色
    if (!bgColorClass.value) {
      style.backgroundColor = bgColorStyle.value || 'var(--tn-color-white)'
      if (!textColorClass.value) {
        style.color = 'var(--tn-text-color-primary)'
      }
    }
    if (textColorStyle.value) {
      style.color = textColorStyle.value
    }

    // 设置字体大小
    if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)

    // 设置自定义样式
    if (!isEmpty(props.customStyle)) {
      Object.assign(style, props.customStyle)
    }

    return style
  })

  // 右图标对应的类
  const rightIconClass = computed<string>(() => {
    const cls: string[] = [ns.e('right-icon')]

    // 设置颜色
    if (rightIconColorClass.value) cls.push(rightIconColorClass.value)

    return cls.join(' ')
  })
  // 右图标对应的样式
  const rightIconStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置颜色
    if (!rightIconColorClass.value) {
      style.color = rightIconColorStyle.value || 'var(--tn-color-gray)'
    }

    return style
  })

  return {
    ns,
    listClass,
    listStyle,
    rightIconClass,
    rightIconStyle,
  }
}
