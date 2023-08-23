import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties } from 'vue'
import type { CalendarProps } from '../calendar'
import type { CalendarItemDateStatus } from '../types'

type itemClassType = (status: CalendarItemDateStatus) => string
type itemStyleType = (status: CalendarItemDateStatus) => CSSProperties

export const useCalendarCustomStyle = (props: CalendarProps) => {
  const ns = useNamespace('calendar')

  // 解析颜色
  const [activeBgColorClass, activeBgColorStyle] = useComponentColor(
    toRef(props, 'activeBgColor'),
    'bg'
  )
  const [activeTextColorClass, activeTextColorStyle] = useComponentColor(
    toRef(props, 'activeTextColor'),
    'text'
  )
  const [rangeBgColorClass, rangeBgColorStyle] = useComponentColor(
    toRef(props, 'rangeBgColor'),
    'bg'
  )
  const [rangeTextColorClass, rangeTextColorStyle] = useComponentColor(
    toRef(props, 'rangeTextColor'),
    'text'
  )

  // dateItem对应的类
  const itemClass = computed<itemClassType>(() => {
    return (status: CalendarItemDateStatus) => {
      const cls: string[] = [ns.is(status)]

      if (status === 'active') {
        if (activeBgColorClass.value) {
          cls.push(activeBgColorClass.value)
        }
        if (activeTextColorClass.value) {
          cls.push(activeTextColorClass.value)
        }
      } else if (status === 'range') {
        if (rangeBgColorClass.value) {
          cls.push(rangeBgColorClass.value)
        }
        if (rangeTextColorClass.value) {
          cls.push(rangeTextColorClass.value)
        }
      }

      return cls.join(' ')
    }
  })
  // dateItem对应的样式
  const itemStyle = computed<itemStyleType>(() => {
    return (status: CalendarItemDateStatus) => {
      const style: CSSProperties = {}

      if (status === 'active') {
        if (!activeBgColorClass.value) {
          style.backgroundColor =
            activeBgColorStyle.value || 'var(--tn-color-primary)'
        }

        if (activeTextColorStyle.value) {
          style.color = activeTextColorStyle.value
        } else if (!activeBgColorClass.value && !activeTextColorClass.value) {
          style.color = 'var(--tn-color-white)'
        }
      } else if (status === 'range') {
        if (!rangeBgColorClass.value) {
          style.backgroundColor =
            rangeBgColorStyle.value || 'var(--tn-color-primary-light-7)'
        }

        if (rangeTextColorStyle.value) {
          style.color = rangeTextColorStyle.value
        } else if (!rangeBgColorClass.value && !rangeTextColorClass.value) {
          style.color = 'var(--tn-color-primary)'
        }
      }

      return style
    }
  })

  return {
    ns,
    itemClass,
    itemStyle,
  }
}
