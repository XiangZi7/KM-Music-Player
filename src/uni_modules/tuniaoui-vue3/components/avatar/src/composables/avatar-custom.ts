import { computed } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'
import { useAvatarProps } from './use-avatar-props'

import type { CSSProperties, Ref } from 'vue'
import type { AvatarProps } from '../avatar'

export const useAvatarCustomStyle = (
  props: AvatarProps,
  groupIndex: Ref<number>,
  avatarWidth: Ref<number>
) => {
  const ns = useNamespace('avatar')

  const {
    type,
    size,
    shape,
    bgColor,
    border,
    borderColor,
    shadow,
    shadowColor,
    avatarGap,
  } = useAvatarProps(props)

  // 解析背景颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(bgColor, 'bg')

  // 解析边框颜色
  const [borderColorClass, borderColorStyle] = useComponentColor(
    borderColor,
    'border'
  )

  // 解析阴影颜色
  const [shadowColorClass] = useComponentColor(shadowColor, 'shadow')

  // 解析头像尺寸
  const { sizeType } = useComponentSize(size.value)

  // 头像动态类
  const avatarClass = computed<string>(() => {
    const cls: string[] = []
    cls.push(ns.b())

    // 设置头像颜色类型
    if (type.value) cls.push(`tn-type-${type.value}_bg`)

    // 设置背景颜色
    if (!type.value && bgColorClass.value) cls.push(bgColorClass.value)

    // 设置头像尺寸
    if (sizeType.value === 'inner') cls.push(ns.m(size.value as string))

    // 设置头像形状
    if (shape.value) cls.push(ns.m(shape.value))

    // 设置边框
    if (border.value) {
      cls.push('tn-border')
      // 设置边框颜色
      if (borderColorClass.value) cls.push(borderColorClass.value)
    }

    // 设置阴影
    if (shadow.value) {
      cls.push('tn-shadow')
      // 设置阴影颜色
      if (shadowColorClass.value) cls.push(shadowColorClass.value)
    }

    return cls.join(' ')
  })

  // 头像动态样式
  const avatarStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置头像尺寸
    if (sizeType.value === 'custom') {
      style.width = formatDomSizeValue(size.value)
      style.height = style.width
    }

    // 设置背景颜色
    if (bgColorStyle.value) style.backgroundColor = bgColorStyle.value

    // 设置边框颜色
    if (border.value && borderColorStyle.value)
      style.borderColor = borderColorStyle.value

    // 如果是头像组，设置头像间距
    if (groupIndex.value != -1) {
      style.zIndex = groupIndex.value + 1
      // style.transform = `translateX(calc(${
      //   (groupAvatarCount.value - groupIndex.value - 1) * 100
      // }% * ${avatarGap.value}))`
      if (groupIndex.value > 0) {
        style.marginLeft = `calc(-${avatarWidth.value * avatarGap.value}px)`
      } else {
        style.marginLeft = '0px'
      }
    }

    return style
  })

  return {
    ns,
    avatarClass,
    avatarStyle,
  }
}
