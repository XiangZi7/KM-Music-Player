import { computed, toRef } from 'vue'
import { formatDomSizeValue, isEmpty } from '../../../../utils'
import { useNamespace } from '../../../../hooks/use-namespace'
import { useComponentColor } from '../../../../hooks/use-component-color'
import { useComponentSize } from '../../../../hooks/use-component-size'

import type { CSSProperties } from 'vue'
import type { IconProps } from '../icon'

export const useIcon = (props: IconProps) => {
  const ns = useNamespace('icon')

  // 解析图标颜色
  const [colorClass, colorStyle, updateColor] = useComponentColor(
    toRef(props, 'color'),
    'text'
  )
  // 解析透明图标背景
  const [transparentBgClass] = useComponentColor(toRef(props, 'transparentBg'), 'bg')
  // 解析图标尺寸
  const { sizeType } = useComponentSize(props.size)

  // 判断是图片还是图鸟内置的图标
  const isImg = computed<boolean>(
    () => !!props?.name && props.name.includes('/')
  )

  // 图标对应的类名
  const iconClass = computed<string>(() => {
    const cls: string[] = []
    cls.push(ns.b())
    // 判断图标是否是图片
    if (isImg.value) {
      cls.push(ns.m('image'))
    } else {
      // 设置图标颜色类型
      if (props.type) cls.push(`tn-type-${props.type}_text`)

      // 判断是否设置透明图标背景
      if (props.transparent) {
        cls.push('tn-text-transparent', transparentBgClass.value)
      } else {
        // 设置图标颜色
        if (colorClass.value) cls.push(colorClass.value)
      }

      // 设置图标加粗
      if (props.bold) cls.push('tn-text-bold')
    }

    // 设置图标尺寸
    if (sizeType.value === 'inner') cls.push(ns.m(props.size as string))

    if (props.customClass) cls.push(props.customClass)
    return cls.join(' ')
  })

  // 图标对应的样式
  const iconStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    // 判断图标是否是图片
    if (isImg.value) {
      // 如果设置了size，则设置图片的宽高
      if (sizeType.value === 'custom' && props.size) {
        style.width = style.height = formatDomSizeValue(props.size)
      }
    } else {
      // 设置图标颜色
      if (colorStyle.value) style.color = colorStyle.value

      // 设置图标大小
      if (sizeType.value === 'custom' && props.size)
        style.fontSize = formatDomSizeValue(props.size)
    }
    // 设置垂直方向上的偏移量
    if (props.offsetTop)
      style.transform = `translateY(${formatDomSizeValue(props.offsetTop)})`

    if (!isEmpty(props.customStyle)) Object.assign(style, props.customStyle)

    return style
  })

  return {
    isImg,
    iconClass,
    iconStyle,
    updateColor,
  }
}
