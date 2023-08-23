import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { ScrollListProps } from '../scroll-list'

export const useScrollListCustomStyle = (props: ScrollListProps) => {
  const ns = useNamespace('scroll-list')

  // 解析颜色
  const [indicatorColorClass, indicatorColorStyle] = useComponentColor(
    toRef(props, 'indicatorColor'),
    'bg'
  )
  const [indicatorBlockColorClass, indicatorBlockColorStyle] =
    useComponentColor(toRef(props, 'indicatorBlockColor'), 'bg')

  // 指示器对应的类
  const indicatorClass = computed<string>(() => {
    const cls: string[] = [ns.e('indicator')]

    if (indicatorColorClass.value) cls.push(indicatorColorClass.value)

    return cls.join(' ')
  })
  // 指示器的样式
  const indicatorStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.indicatorWidth)
      style.width = formatDomSizeValue(props.indicatorWidth, 'px')

    if (!indicatorColorClass.value) {
      style.backgroundColor =
        indicatorColorStyle.value || 'var(--tn-color-gray-disabled)'
    }

    return style
  })

  // 指示器滑块对应的类
  const indicatorBlockClass = computed<string>(() => {
    const cls: string[] = [ns.e('indicator-block')]

    if (indicatorBlockColorClass.value) cls.push(indicatorBlockColorClass.value)

    return cls.join(' ')
  })
  // 指示器滑块的样式
  const indicatorBlockStyle = computed<(distance: number) => CSSProperties>(
    () => {
      return (distance: number) => {
        const style: CSSProperties = {}

        if (props.indicatorBlockWidth)
          style.width = formatDomSizeValue(props.indicatorBlockWidth, 'px')

        style.left = `${distance}px`

        if (!indicatorBlockColorClass.value) {
          style.backgroundColor =
            indicatorBlockColorStyle.value || 'var(--tn-color-primary)'
        }

        return style
      }
    }
  )

  return {
    ns,
    indicatorClass,
    indicatorStyle,
    indicatorBlockClass,
    indicatorBlockStyle,
  }
}
