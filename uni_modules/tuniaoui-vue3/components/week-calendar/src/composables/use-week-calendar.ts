import { computed, nextTick, ref } from 'vue'
import dayjs from '../../../../libs/dayjs'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { isEmptyVariableInDefault } from '../../../../utils'
import { useWeekCalendarSelector } from './use-week-calendar-selector'

import type { SetupContext } from 'vue'
import type { WeekCalendarEmits, WeekCalendarProps } from '../week-calendar'
import type {
  WeekCalanderDateStatus,
  WeekCalendarData,
  WeekCalendarItem,
} from '../types'

export const useWeekCalendar = (
  props: WeekCalendarProps,
  emits: SetupContext<WeekCalendarEmits>['emit']
) => {
  // 当前日期的Dayjs
  const currentDateDayjs = dayjs()

  const { componentDateItemId, dateItemContainerHeight } =
    useWeekCalendarSelector()

  // 当前日期的年份
  const currentYear = computed<number>(() =>
    props.year ? Number(props.year) : currentDateDayjs.year()
  )
  // 当前日期的月份
  const currentMonth = computed<number>(() =>
    props.month ? Number(props.month) : currentDateDayjs.month() + 1
  )
  // 最小可选日期
  const minDate = computed<number>(() =>
    props.minDate
      ? Number(props.minDate)
      : currentDateDayjs.year() === currentYear.value &&
        currentDateDayjs.month() + 1 === currentMonth.value
      ? currentDateDayjs.date()
      : 1
  )
  // 最大可选日期
  const maxDate = computed<number>(() =>
    props.maxDate ? Number(props.maxDate) : currentDateDayjs.daysInMonth()
  )

  // 用户自定义日期描述数据
  const customDescData = computed<Map<number, string>>(() => {
    const map = new Map<number, string>()
    props.customData.forEach((item) => {
      map.set(item.date, item.desc)
    })
    return map
  })

  // 星期提示文字
  const weekText = ref<string[]>(['日', '一', '二', '三', '四', '五', '六'])

  // 周日历数据
  const weekCalendarData = ref<WeekCalendarData>([])

  // 当前激活的日期
  const activeDate = computed<number>(() =>
    isEmptyVariableInDefault(props.modelValue, 0)
  )
  // 当前选中的轮播位置
  const currentSwiperIndex = ref<number>(0)

  // 更新指定的日期为激活状态
  const updateActiveDate = (date: number) => {
    weekCalendarData.value.forEach((week) => {
      week.forEach((item) => {
        if (item.status !== 'disabled') {
          if (item.date === date) {
            item.status = 'active'
          } else {
            item.status = 'normal'
          }
        }
      })
    })
  }

  // 更新modelValue的值
  const updateModelValue = (value: number, changeEmits = true) => {
    emits(UPDATE_MODEL_EVENT, value)
    if (changeEmits) {
      updateActiveDate(value)
      nextTick(() => {
        emits(CHANGE_EVENT, value)
      })
    }
  }

  // 生成周日历数据
  const generateWeekCalendarData = () => {
    const data: WeekCalendarItem[] = []

    const generateMonthDayjs = dayjs(
      `${currentYear.value}/${currentMonth.value}/01`
    )
    const dates = generateMonthDayjs.daysInMonth()
    const firstDayWeek = generateMonthDayjs.day()

    // 填充空白数据
    for (let i = 0; i < firstDayWeek; i++) {
      data.push({
        date: 0,
        status: 'disabled',
      })
    }

    // 填充日期数据
    for (let i = 1; i <= dates; i++) {
      let status: WeekCalanderDateStatus =
        i >= minDate.value && i <= maxDate.value ? 'normal' : 'disabled'
      if (i === activeDate.value) {
        status = 'active'
        // 设置当前激活日期所在的位置
        currentSwiperIndex.value = Math.floor((i + firstDayWeek - 1) / 7)
      }
      const desc = customDescData.value.get(i)
      data.push({
        date: i,
        status,
        desc,
      })
    }

    // 分割数据，每7个为一组
    const result: WeekCalendarData = []
    for (let i = 0; i < data.length; i += 7) {
      result.push(data.slice(i, i + 7))
    }
    weekCalendarData.value = result
  }

  // 初始化周日历数据
  const initWeekCalendarData = () => {
    let updateModelValueDate = false
    let modelValue = props.modelValue
    // 判断modelValue是否有值，并且在最小和最大日期范围内
    // 如果没有值则以当前日期为准
    if (!modelValue) {
      modelValue = currentDateDayjs.date()
      updateModelValueDate = true
    }
    // 如果比最小日期小，则以最小日期为准
    if (modelValue < minDate.value) {
      modelValue = minDate.value
      updateModelValueDate = true
    }
    // 如果比最大日期大，则以最大日期为准
    if (modelValue > maxDate.value) {
      modelValue = maxDate.value
      updateModelValueDate = true
    }

    if (updateModelValueDate) {
      updateModelValue(modelValue)
    }

    nextTick(() => {
      generateWeekCalendarData()
    })
  }
  initWeekCalendarData()

  // 日期选中事件
  const dateItemClick = (item: WeekCalendarItem) => {
    if (
      item.status === 'active' ||
      item.status === 'disabled' ||
      item.date === 0
    )
      return
    updateModelValue(item.date)
  }

  // 切换星期
  const switchWeek = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      if (currentSwiperIndex.value === 0) return
      currentSwiperIndex.value--
    }
    if (type === 'next') {
      if (currentSwiperIndex.value === weekCalendarData.value.length - 1) return
      currentSwiperIndex.value++
    }
    emits('week-change', currentSwiperIndex.value)
  }

  // 滑动切换星期
  const swiperChangeWeek = (event: any) => {
    currentSwiperIndex.value = event.detail.current
    emits('week-change', currentSwiperIndex.value)
  }

  return {
    componentDateItemId,
    dateItemContainerHeight,
    weekCalendarData,
    weekText,
    currentSwiperIndex,
    dateItemClick,
    switchWeek,
    swiperChangeWeek,
  }
}
