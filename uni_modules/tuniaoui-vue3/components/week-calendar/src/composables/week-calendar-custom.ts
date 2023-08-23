import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties } from 'vue'
import type { WeekCalendarProps } from '../week-calendar'
import type { WeekCalanderDateStatus } from '../types'

type WeekCalendarItemClass = (status: WeekCalanderDateStatus) => string
type WeekCalendarItemStyle = (status: WeekCalanderDateStatus) => CSSProperties

export const useWeekCalendarCustomStyle = (props: WeekCalendarProps) => {
  const ns = useNamespace('week-calendar')

  // 解析颜色
  const [activeBgColorClass, activeBgColorStyle] = useComponentColor(
    toRef(props, 'activeBgColor'),
    'bg'
  )
  const [activeTextColorClass, activeTextColorStyle] = useComponentColor(
    toRef(props, 'activeTextColor'),
    'text'
  )

  // dateItem对应的类
  const itemClass = computed<WeekCalendarItemClass>(() => {
    return (status: WeekCalanderDateStatus) => {
      const cls: string[] = [ns.is(status)]

      if (status === 'active') {
        if (activeBgColorClass.value) cls.push(activeBgColorClass.value)
        if (activeTextColorClass.value) cls.push(activeTextColorClass.value)
      }

      return cls.join(' ')
    }
  })
  // dateItem的样式
  const itemStyle = computed<WeekCalendarItemStyle>(() => {
    return (status: WeekCalanderDateStatus) => {
      const style: CSSProperties = {}

      if (status === 'active') {
        if (!activeBgColorClass.value)
          style.backgroundColor =
            activeBgColorStyle.value || 'var(--tn-color-primary)'

        if (activeTextColorStyle.value) {
          style.color = activeTextColorStyle.value
        } else if (!activeBgColorClass.value && !activeTextColorClass.value) {
          style.color = 'var(--tn-color-white)'
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
