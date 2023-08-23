import { computed } from 'vue'
import { useComponentSize, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { RateProps } from '../rate'
import type { RateItem } from '../types'

type ItemType = 'active' | 'inactive'
type ItemClassType = (type: ItemType, item: RateItem) => string
type ItemStyleType = (type: ItemType, item: RateItem) => CSSProperties

export const useRateCustomStyle = (props: RateProps) => {
  const ns = useNamespace('rate')

  const { sizeType } = useComponentSize(props.size)

  // rate对应的类
  const rateClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    if (props.size && sizeType.value === 'inner') cls.push(ns.m(props.size))

    if (props.readonly) cls.push(ns.is('readonly'))

    return cls.join(' ')
  })

  // item对应的类
  const itemClass = computed<ItemClassType>(() => {
    return (type, item) => {
      const cls: string[] = [ns.e('item'), ns.is(type)]

      if (item.color.class) cls.push(item.color.class)

      return cls.join(' ')
    }
  })
  // item对应的样式
  const itemStyle = computed<ItemStyleType>(() => {
    return (type, item) => {
      const style: CSSProperties = {}

      if (props.size && sizeType.value === 'custom')
        style.fontSize = formatDomSizeValue(props.size)

      if (props.gutter)
        style.padding = `0rpx calc(${formatDomSizeValue(props.gutter)} / 2)`

      if (type === 'active') {
        if (!item.color.class)
          style.color = item.color.style || 'var(--tn-color-primary)'
      }
      if (type === 'inactive') {
        if (!item.color.class)
          style.color = item.color.style || 'var(--tn-color-gray)'
      }

      return style
    }
  })

  return {
    ns,
    rateClass,
    itemStyle,
    itemClass,
  }
}
