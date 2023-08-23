import { computed, ref } from 'vue'
import dayjs from '../../../../libs/dayjs'
import { innerDefaultDateTimeFormat } from '../types'

import type { Dayjs } from '../../../../libs/dayjs'
import type { DateTimePickerProps } from '../date-time-picker'

type PickerColumn = { label: string; value: string | number }
type PickerData = Array<Array<PickerColumn>>

interface TimeOptions extends Object {
  year: number
  month: number
  date: number
  hour: number
  minute: number
  second: number
}

// 验证和格式化日期时间
// const _verifyFormatDateTimeStr = (dateTime: string): string => {
//   const datePattern = /\d{4}[-/]\d{2}[-/]\d{2}/
//   const timePattern = /\d{2}:\d{2}:\d{2}/

//   const hasDate = datePattern.test(dateTime)
//   const hasTime = timePattern.test(dateTime)

//   // 如果只传递了时间没有传递日期，则默认使用当天的日期
//   if (!hasDate) {
//     dateTime = `${dayjs(new Date()).format('YYYY-MM-DD')} ${dateTime}`
//   }
//   // 如果只传递了日期没有传递时间，则默认使用00:00:00
//   if (!hasTime) {
//     dateTime = `${dateTime} 00:00:00`
//   }
//   return dateTime
// }

// 当前时间
const nowDayjs = dayjs()

// 生成指定范围内的数据并放入数组中
const generateRangeData = (start: number, end: number): Array<number> => {
  end = end < start ? start : end
  return Array.from({ length: end - start + 1 }).map((_, index) => {
    return start + index
  })
}

export const useDateTimeData = (props: DateTimePickerProps) => {
  // 年列数据
  const yearColumnData = ref<Array<PickerColumn>>([])
  // 月列数据
  const monthColumnData = ref<Array<PickerColumn>>([])
  // 日列数据
  const dayColumnData = ref<Array<PickerColumn>>([])
  // 时列数据
  const hourColumnData = ref<Array<PickerColumn>>([])
  // 分列数据
  const minuteColumnData = ref<Array<PickerColumn>>([])
  // 秒列数据
  const secondColumnData = ref<Array<PickerColumn>>([])

  // 填充日期时间
  const fillDateTime = (value: string): string => {
    const datePattern = /\d{4}[-/]\d{1,2}[-/]\d{1,2}/
    const timePattern = /\d{1,2}:\d{1,2}:\d{1,2}/

    const hasDate = datePattern.test(value)
    const hasTime = timePattern.test(value)
    if (!hasDate && !hasTime) {
      if (props.mode === 'year') {
        return `${value}/01/01 00:00:00`
      }
      if (props.mode === 'yearmonth') {
        return `${value}/01 00:00:00`
      }
      if (props.mode === 'date') {
        return `${value} 00:00:00`
      }
    }
    if (props.mode === 'time' && hasTime && !hasDate) {
      return `1970/01/01 ${value}`
    }
    return value
  }

  const minTimeDayjs = computed<Dayjs>(() => {
    let time = `${nowDayjs.year() - 10}/01/01 00:00:00`
    if (props.minTime) time = props.minTime
    return dayjs(fillDateTime(time), innerDefaultDateTimeFormat)
  })
  const maxTimeDayjs = computed<Dayjs>(() => {
    let time = `${nowDayjs.year() + 10}/12/31 23:59:59`
    if (props.maxTime) time = props.maxTime
    return dayjs(fillDateTime(time), innerDefaultDateTimeFormat)
  })

  // 获取日期时间的最大/小值
  const getTimeMaxMinValue = (
    currentValue: TimeOptions | Dayjs,
    maxMinValue: TimeOptions | Dayjs,
    defaultValue: TimeOptions
  ): TimeOptions => {
    const result: TimeOptions = { ...defaultValue }
    let currentYear = 0
    let currentMonth = 0
    let currentDate = 0
    let currentHour = 0
    let currentMinute = 0
    let maxMinYear = 0
    let maxMinMonth = 0
    let maxMinDate = 0
    let maxMinHour = 0
    let maxMinMinute = 0
    let maxMinSecond = 0

    if (currentValue.toString() === '[object Object]') {
      ;({
        year: currentYear,
        month: currentMonth,
        date: currentDate,
        hour: currentHour,
        minute: currentMinute,
      } = currentValue as TimeOptions)
    } else {
      currentYear = (currentValue as Dayjs).year()
      currentMonth = (currentValue as Dayjs).month()
      currentDate = (currentValue as Dayjs).date()
      currentHour = (currentValue as Dayjs).hour()
      currentMinute = (currentValue as Dayjs).minute()
    }

    if (maxMinValue.toString() === '[object Object]') {
      ;({
        year: maxMinYear,
        month: maxMinMonth,
        date: maxMinDate,
        hour: maxMinHour,
        minute: maxMinMinute,
        second: maxMinSecond,
      } = maxMinValue as TimeOptions)
    } else {
      maxMinYear = (maxMinValue as Dayjs).year()
      maxMinMonth = (maxMinValue as Dayjs).month()
      maxMinDate = (maxMinValue as Dayjs).date()
      maxMinHour = (maxMinValue as Dayjs).hour()
      maxMinMinute = (maxMinValue as Dayjs).minute()
      maxMinSecond = (maxMinValue as Dayjs).second()
    }

    if (currentYear === maxMinYear) {
      result.month = maxMinMonth
      if (currentMonth === maxMinMonth) {
        result.date = maxMinDate
        if (currentDate === maxMinDate) {
          result.hour = maxMinHour
          if (currentHour === maxMinHour) {
            result.minute = maxMinMinute
            if (currentMinute === maxMinMinute) {
              result.second = maxMinSecond
            }
          }
        }
      }
    }

    return result
  }

  // 生成/更新picker数据
  const generatePickerData = (value: Dayjs) => {
    const sameMinYear = value.year() === minTimeDayjs.value.year()
    const sameMaxYear = value.year() === maxTimeDayjs.value.year()
    const sameMinMonth = value.month() === minTimeDayjs.value.month()
    const sameMaxMonth = value.month() === maxTimeDayjs.value.month()
    const sameMinDate = value.date() === minTimeDayjs.value.date()
    const sameMaxDate = value.date() === maxTimeDayjs.value.date()
    const sameMinHour = value.hour() === minTimeDayjs.value.hour()
    const sameMaxHour = value.hour() === maxTimeDayjs.value.hour()
    const sameMinMinute = value.minute() === minTimeDayjs.value.minute()
    const sameMaxMinute = value.minute() === maxTimeDayjs.value.minute()

    // 判断是否有设置开始、结束年份，如果没有则使用前后10年
    const minYear = minTimeDayjs.value.year()
    const maxYear = maxTimeDayjs.value.year()
    const minMonth = sameMinYear ? minTimeDayjs.value.month() + 1 : 1
    const maxMonth = sameMaxYear ? maxTimeDayjs.value.month() + 1 : 12
    const minDay = sameMinYear && sameMinMonth ? minTimeDayjs.value.date() : 1
    const maxDay =
      sameMaxYear && sameMaxMonth
        ? maxTimeDayjs.value.date()
        : value.daysInMonth()
    // 判断是否有设置开始、结束时间，如果没有则使用00:00:00和23:59:59
    const minHour =
      (sameMinYear && sameMinMonth && sameMinDate) || props.mode === 'time'
        ? minTimeDayjs.value.hour()
        : 0
    const maxHour =
      (sameMaxYear && sameMaxMonth && sameMaxDate) || props.mode === 'time'
        ? maxTimeDayjs.value.hour()
        : 23
    const minMinute =
      ((sameMinYear && sameMinMonth && sameMinDate) || props.mode === 'time') &&
      sameMinHour
        ? minTimeDayjs.value.minute()
        : 0
    const maxMinute =
      ((sameMaxYear && sameMaxMonth && sameMaxDate) || props.mode === 'time') &&
      sameMaxHour
        ? maxTimeDayjs.value.minute()
        : 59
    const minSecond =
      ((sameMinYear && sameMinMonth && sameMinDate) || props.mode === 'time') &&
      sameMinHour &&
      sameMinMinute
        ? minTimeDayjs.value.second()
        : 0
    const maxSecond =
      ((sameMaxYear && sameMaxMonth && sameMaxDate) || props.mode === 'time') &&
      sameMaxHour &&
      sameMaxMinute
        ? maxTimeDayjs.value.second()
        : 59
    // if (props.mode === 'time') {
    //   if (props.minTime) {
    //     const minTimeValue = getTimeMaxMinValue(value, minTimeDayjs.value, {
    //       hour: minHour,
    //       minute: minMinute,
    //       second: minSecond,
    //     })
    //     minHour = minTimeValue.hour
    //     minMinute = minTimeValue.minute
    //     minSecond = minTimeValue.second
    //   }
    //   if (props.maxTime) {
    //     const maxTimeValue = getTimeMaxMinValue(value, maxTimeDayjs.value, {
    //       hour: maxHour,
    //       minute: maxMinute,
    //       second: maxSecond,
    //     })
    //     maxHour = maxTimeValue.hour
    //     maxMinute = maxTimeValue.minute
    //     maxSecond = maxTimeValue.second
    //   }
    // }

    // 生成对应的年、月、日、时、分、秒数据
    yearColumnData.value = generateRangeData(minYear, maxYear).map((year) => {
      return {
        label: `${year}年`,
        value: year,
      }
    })
    monthColumnData.value = generateRangeData(minMonth, maxMonth).map(
      (month) => {
        return {
          label: `${String(month).padStart(2, '0')}月`,
          value: month,
        }
      }
    )
    dayColumnData.value = generateRangeData(minDay, maxDay).map((day) => {
      return {
        label: `${String(day).padStart(2, '0')}日`,
        value: day,
      }
    })
    hourColumnData.value = generateRangeData(minHour, maxHour).map((hour) => {
      return {
        label: String(hour).padStart(2, '0'),
        value: hour,
      }
    })
    minuteColumnData.value = generateRangeData(minMinute, maxMinute).map(
      (minute) => {
        return {
          label: String(minute).padStart(2, '0'),
          value: minute,
        }
      }
    )
    secondColumnData.value = generateRangeData(minSecond, maxSecond).map(
      (second) => {
        return {
          label: String(second).padStart(2, '0'),
          value: second,
        }
      }
    )
  }

  // picker数据
  const pickerData = computed<PickerData>(() => {
    const result: PickerData = []
    if (props.mode === 'year') result.push(yearColumnData.value)
    if (props.mode === 'yearmonth')
      result.push(yearColumnData.value, monthColumnData.value)
    if (props.mode === 'date')
      result.push(
        yearColumnData.value,
        monthColumnData.value,
        dayColumnData.value
      )
    if (props.mode === 'time')
      result.push(
        hourColumnData.value,
        minuteColumnData.value,
        secondColumnData.value
      )
    if (props.mode === 'datetime')
      result.push(
        yearColumnData.value,
        monthColumnData.value,
        dayColumnData.value,
        hourColumnData.value,
        minuteColumnData.value,
        secondColumnData.value
      )

    return result
  })

  return {
    pickerData,
    minTimeDayjs,
    maxTimeDayjs,
    generatePickerData,
    fillDateTime,
    getTimeMaxMinValue,
  }
}
