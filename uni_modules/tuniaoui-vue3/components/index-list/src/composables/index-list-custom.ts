import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { IndexListProps } from '../index-list'

export const useIndexListCustomStyle = (props: IndexListProps) => {
  const ns = useNamespace('index-list')

  // 解析颜色
  const [titleBgColorClass, titleBgColorStyle] = useComponentColor(
    toRef(props, 'titleBgColor'),
    'bg'
  )
  const [titleTextColorClass, titleTextColorStyle] = useComponentColor(
    toRef(props, 'titleColor'),
    'text'
  )
  // 解析尺寸
  const { sizeType } = useComponentSize(props.titleSize)

  // 标题的类
  const titleClass = computed<string>(() => {
    const cls: string[] = [ns.e('title')]

    if (props.titleSize && sizeType.value === 'inner')
      cls.push(ns.em('title', props.titleSize))

    if (titleBgColorClass.value) cls.push(titleBgColorClass.value)
    if (titleTextColorClass.value) cls.push(titleTextColorClass.value)

    return cls.join(' ')
  })

  // 标题的样式
  const titleStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!titleBgColorClass.value)
      style.backgroundColor =
        titleBgColorStyle.value || 'var(--tn-color-gray-disabled)'

    if (titleTextColorStyle.value) {
      style.color = titleTextColorStyle.value
    } else if (!titleBgColorClass.value && !titleTextColorClass.value) {
      style.color = 'var(--tn-color-gray)'
    }

    if (props.titleSize && sizeType.value === 'custom')
      style.fontSize = formatDomSizeValue(props.titleSize)

    return style
  })

  return {
    ns,
    titleClass,
    titleStyle,
  }
}
