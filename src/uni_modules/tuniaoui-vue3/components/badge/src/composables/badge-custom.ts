import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue, isEmpty } from '../../../../utils'
import { useBadge } from './use-badge'

import type { CSSProperties } from 'vue'
import type { BadgeProps } from '../badge'

export const useBadgeCustomStyle = (props: BadgeProps) => {
  const ns = useNamespace('badge')
  const contentNs = useNamespace('badge-content')

  const { contentType } = useBadge(props)

  // 解析背景颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )
  // 解析文字颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )
  // 解析尺寸大小
  const { sizeType } = useComponentSize(props.size)

  // 徽标内容对应的类
  const badgeContentClass = computed<string>(() => {
    const cls: string[] = []
    cls.push(contentNs.b())

    // 点徽标
    if (props.dot) cls.push(contentNs.m('dot'))
    // 图标徽标
    if (contentType.value === 'icon') cls.push(contentNs.m('icon'))

    // 绝对定位
    if (props.absolute) {
      cls.push(contentNs.e('absolute'))
      if (props.absoluteCenter) cls.push(contentNs.em('absolute', 'center'))
    }

    // 设置类型颜色
    if (props.type) cls.push(`tn-type-${props.type}_bg`)

    // 背景颜色
    if (bgColorClass.value) cls.push(bgColorClass.value)

    // 字体颜色
    if (textColorClass.value) cls.push(textColorClass.value)

    // 尺寸大小
    if (props.size && sizeType.value === 'inner')
      cls.push(contentNs.m(props.size as string))

    // 加粗字体
    if (props.bold) cls.push('tn-text-bold')

    if (props.customClass) cls.push(props.customClass)
    return cls.join(' ')
  })

  // 徽标对应的样式
  const badgeContentStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 背景颜色
    if (bgColorStyle.value) style.backgroundColor = bgColorStyle.value

    // 字体颜色
    if (textColorStyle.value) style.color = textColorStyle.value

    // 尺寸大小
    if (
      props.size &&
      (sizeType.value === 'custom' || contentType.value === 'icon')
    )
      style.width = style.height = formatDomSizeValue(props.size)

    // 字体尺寸
    if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)

    // 绝对定位是徽标偏移量
    if (props.absolutePosition.top)
      style.top = formatDomSizeValue(props.absolutePosition.top)
    if (props.absolutePosition.right)
      style.right = formatDomSizeValue(props.absolutePosition.right)
    if (!isEmpty(props.customStyle)) {
      Object.assign(style, props.customStyle)
    }
    return style
  })

  return {
    ns,
    contentNs,
    badgeContentClass,
    badgeContentStyle,
  }
}
