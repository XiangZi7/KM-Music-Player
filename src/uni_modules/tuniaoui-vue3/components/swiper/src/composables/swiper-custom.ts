import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { SwiperProps } from '../swiper'

type IndicatorColorClass = (active: boolean) => string
type IndicatorColorStyle = (active: boolean) => CSSProperties

export const useSwiperCustomStyle = (props: SwiperProps) => {
  const ns = useNamespace('swiper')

  // 解析颜色
  const [indicatorBgColorClass, indicatorBgColoeStyle] = useComponentColor(
    toRef(props, 'indicatorBgColor'),
    'bg'
  )
  const [indicatorTextColorClass, indicatorTextColorStyle] = useComponentColor(
    toRef(props, 'indicatorTextColor'),
    'text'
  )
  const [indicatorActiveBgColorClass, indicatorActiveBgColorStyle] =
    useComponentColor(toRef(props, 'indicatorActiveBgColor'), 'bg')

  // swiper对应的样式
  const swiperStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.width !== undefined) style.width = formatDomSizeValue(props.width)
    if (props.height !== undefined)
      style.height = formatDomSizeValue(props.height)

    return style
  })

  // 指示器颜色对应的类
  const indicatorColorClass = computed<IndicatorColorClass>(() => {
    return (active: boolean) => {
      const cls: string[] = []

      if (props.indicatorType === 'number') {
        if (indicatorBgColorClass.value) cls.push(indicatorBgColorClass.value)
        if (indicatorTextColorClass.value)
          cls.push(indicatorTextColorClass.value)
      } else {
        if (active) {
          if (indicatorActiveBgColorClass.value)
            cls.push(indicatorActiveBgColorClass.value)
        } else {
          if (indicatorBgColorClass.value) cls.push(indicatorBgColorClass.value)
        }
      }

      return cls.join(' ')
    }
  })

  // 指示器颜色对应的样式
  const indicatorColorStyle = computed<IndicatorColorStyle>(() => {
    return (active: boolean) => {
      const style: CSSProperties = {}

      if (props.indicatorType === 'number') {
        if (!indicatorBgColorClass.value) {
          style.backgroundColor =
            indicatorBgColoeStyle.value || 'rgba(0, 0, 0, 0.25)'
        }
        if (indicatorTextColorStyle.value) {
          style.color = indicatorTextColorStyle.value
        } else if (
          !indicatorTextColorClass.value &&
          !indicatorBgColorClass.value
        ) {
          style.color = 'var(--tn-color-white)'
        }
      } else {
        if (active) {
          if (!indicatorActiveBgColorClass.value)
            style.backgroundColor =
              indicatorActiveBgColorStyle.value || 'var(--tn-color-white)'
        } else {
          if (!indicatorBgColorClass.value)
            style.backgroundColor =
              indicatorBgColoeStyle.value || 'rgba(0, 0, 0, 0.25)'
        }
      }

      return style
    }
  })

  return {
    ns,
    swiperStyle,
    indicatorColorClass,
    indicatorColorStyle,
  }
}
