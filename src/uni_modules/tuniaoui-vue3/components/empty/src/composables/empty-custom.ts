import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { EmptyProps } from '../empty'

type TextIconStyleType = (type: 'icon' | 'tips') => CSSProperties

export const useEmptyCustomStyle = (
  props: EmptyProps,
  customIconContent: Ref<boolean>,
  customTipsContent: Ref<boolean>
) => {
  const ns = useNamespace('empty')

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'color'),
    'text'
  )

  const { sizeType } = useComponentSize(props.size)

  // empty对应的类
  const emptyClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置背景颜色
    if (textColorClass.value) cls.push(textColorClass.value)

    // 设置尺寸
    if (props.size && sizeType.value === 'inner') cls.push(ns.m(props.size))

    return cls.join(' ')
  })
  // empty对应的样式
  const emptyStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置背景颜色
    if (!textColorClass.value) {
      style.color = textColorStyle.value || 'var(--tn-color-gray-disbaled)'
    }

    return style
  })

  // 设置icon和text的样式
  const iconTextStyle = computed<TextIconStyleType>(() => {
    return (type: 'icon' | 'tips') => {
      const style: CSSProperties = {}

      // 设置用户自定义尺寸
      if (props.size && sizeType.value === 'custom') {
        if (type === 'icon' && !customIconContent.value) {
          style.fontSize = formatDomSizeValue(props.size)
          style.width = style.height = formatDomSizeValue(props.size)
        }
        if (type === 'tips' && !customTipsContent.value) {
          style.fontSize = `calc(${formatDomSizeValue(props.size)} * 0.35)`
        }
      }

      return style
    }
  })

  return {
    ns,
    emptyClass,
    emptyStyle,
    iconTextStyle,
  }
}
