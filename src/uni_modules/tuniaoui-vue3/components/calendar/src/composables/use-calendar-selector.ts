import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import { useSelectorQuery } from '../../../../hooks'
import { debugWarn, generateId } from '../../../../utils'

import type { Ref } from 'vue'
import type { CalendarMode } from '../calendar'

export const useCalendarSelector = (
  currentDateCount: Ref<number>,
  mode: CalendarMode
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnCalendar', '请在 setup 函数中使用 useCalendarSelector')
  }

  const calendarId = `tc-${generateId()}`

  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 单个日期的高度
  const singleDateItemHeight = ref<number>(0)

  // 日期容器的高度
  const dateContainerHeight = computed<number>(
    () => Math.ceil(currentDateCount.value / 7) * singleDateItemHeight.value
  )

  let initCount = 0
  // 获取单个日期容器的信息
  const getDateItemComponentRectInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(
        `#${calendarId} .tn-calendar__data__date`
      )

      initCount = 0
      singleDateItemHeight.value = rectInfo.width || 0
      if (mode === 'date' || mode === 'multi') {
        singleDateItemHeight.value += uni.upx2px(12)
      }
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnCalendar', `获取单个日期容器信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getDateItemComponentRectInfo()
      }, 150)
    }
  }

  onMounted(() => {
    nextTick(() => {
      setTimeout(() => {
        getDateItemComponentRectInfo()
      }, 50)
    })
  })

  return {
    calendarId,
    dateContainerHeight,
  }
}
