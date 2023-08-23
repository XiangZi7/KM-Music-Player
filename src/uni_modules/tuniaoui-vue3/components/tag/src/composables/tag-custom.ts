import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue, isEmpty } from '../../../../utils'
import type { CSSProperties } from 'vue'
import type { TagProps } from '../tag'

export const useTagCustomStyle = (props: TagProps) => {
  // 命名空间
  const ns = useNamespace('tag')
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
  // 标签动态类
  const tagClass = computed<string>(() => {
    const cls: string[] = []
    cls.push(ns.b())
    // 设置标签尺寸
    if (props.size) cls.push(ns.m(props.size))

    // 设置标签形状
    if (props.shape) cls.push(ns.m(props.shape))

    // 设置按钮颜色类型
    if (props.type) cls.push(`tn-type-${props.type}_bg`)

    // 设置背景颜色
    if (bgColorClass.value) cls.push(bgColorClass.value)

    // 设置字体颜色
    if (textColorClass.value) cls.push(textColorClass.value)

    // 设置边框信息
    if (props.border) {
      cls.push('tn-border')
      // 设置边框颜色
      if (borderColorClass.value) cls.push(borderColorClass.value)
    }

    // 设置边框加粗
    if (props.borderBold) cls.push('tn-border-bold')
    if (props.customClass) cls.push(props.customClass)
    return cls.join(' ')
  })

  // 标签样式
  const tagStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    // 设置字体大小
    if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)

    // 设置宽度
    if (props.width) style.width = formatDomSizeValue(props.width)

    // 设置高度
    if (props.height) style.height = formatDomSizeValue(props.height)

    // 设置背景颜色
    if (bgColorStyle.value) style.backgroundColor = bgColorStyle.value

    // 设置字体颜色
    if (textColorStyle.value) style.color = textColorStyle.value

    // 设置边框颜色
    if (borderColorStyle.value) style.borderColor = borderColorStyle.value
    if (!isEmpty(props.customStyle)) {
      Object.assign(style, props.customStyle)
    }
    return style
  })

  return {
    tagStyle,
    tagClass,
  }
}
