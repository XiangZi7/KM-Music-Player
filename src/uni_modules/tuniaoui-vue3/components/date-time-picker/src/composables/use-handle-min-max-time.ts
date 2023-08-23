import type { Ref } from 'vue'
import type { Dayjs } from 'dayjs'
import type { DateTimePickerMode } from '../date-time-picker'

export const useHandleMinMaxTime = (
  minTime: Ref<Dayjs>,
  maxTime: Ref<Dayjs>
) => {
  /* 处理picker发生修改后最小最大值 start */
  const handlePickerChangeMinMaxTime = (
    mode: DateTimePickerMode,
    timeValue: Dayjs
  ): Dayjs => {
    switch (mode) {
      case 'yearmonth':
        return handlePickerChangeMinMaxTimeForYearMonth(timeValue)
      case 'date':
        return handlePickerChangeMinMaxTimeForDate(timeValue)
      case 'datetime':
        return handlePickerChangeMinMaxTimeForDateTime(timeValue)
      case 'time':
        return handlePickerChangeMinMaxTimeForTime(timeValue)
      default:
        return timeValue
    }
  }

  // 处理mode为yearmonth时，最小最大值的处理
  const handlePickerChangeMinMaxTimeForYearMonth = (
    timeValue: Dayjs
  ): Dayjs => {
    if (timeValue.year() === minTime.value.year()) {
      timeValue = timeValue.set(
        'month',
        Math.max(minTime.value.month(), timeValue.month())
      )
    }
    if (timeValue.year() === maxTime.value.year()) {
      timeValue = timeValue.set(
        'month',
        Math.min(maxTime.value.month(), timeValue.month())
      )
    }
    return timeValue
  }
  // 处理mode为date时，最小最大值的处理
  const handlePickerChangeMinMaxTimeForDate = (timeValue: Dayjs): Dayjs => {
    if (timeValue.year() === minTime.value.year()) {
      timeValue = timeValue.set(
        'month',
        Math.max(minTime.value.month(), timeValue.month())
      )
      if (timeValue.month() === minTime.value.month()) {
        timeValue = timeValue.set(
          'date',
          Math.max(minTime.value.date(), timeValue.date())
        )
      }
    }
    if (timeValue.year() === maxTime.value.year()) {
      timeValue = timeValue.set(
        'month',
        Math.min(maxTime.value.month(), timeValue.month())
      )
      if (timeValue.month() === maxTime.value.month()) {
        timeValue = timeValue.set(
          'date',
          Math.min(maxTime.value.date(), timeValue.date())
        )
      }
    }
    return timeValue
  }
  // 处理mode为datetime时，最小最大值的处理
  const handlePickerChangeMinMaxTimeForDateTime = (timeValue: Dayjs): Dayjs => {
    if (timeValue.year() === minTime.value.year()) {
      timeValue = timeValue.set(
        'month',
        Math.max(minTime.value.month(), timeValue.month())
      )
      if (timeValue.month() === minTime.value.month()) {
        timeValue = timeValue.set(
          'date',
          Math.max(minTime.value.date(), timeValue.date())
        )
        if (timeValue.date() === minTime.value.date()) {
          timeValue = timeValue.set(
            'hour',
            Math.max(minTime.value.hour(), timeValue.hour())
          )
          if (timeValue.hour() === minTime.value.hour()) {
            timeValue = timeValue.set(
              'minute',
              Math.max(minTime.value.minute(), timeValue.minute())
            )
            if (timeValue.minute() === minTime.value.minute()) {
              timeValue = timeValue.set(
                'second',
                Math.max(minTime.value.second(), timeValue.second())
              )
            }
          }
        }
      }
    }
    if (timeValue.year() === maxTime.value.year()) {
      timeValue = timeValue.set(
        'month',
        Math.min(maxTime.value.month(), timeValue.month())
      )
      if (timeValue.month() === maxTime.value.month()) {
        timeValue = timeValue.set(
          'date',
          Math.min(maxTime.value.date(), timeValue.date())
        )
        if (timeValue.date() === maxTime.value.date()) {
          timeValue = timeValue.set(
            'hour',
            Math.min(maxTime.value.hour(), timeValue.hour())
          )
          if (timeValue.hour() === maxTime.value.hour()) {
            timeValue = timeValue.set(
              'minute',
              Math.min(maxTime.value.minute(), timeValue.minute())
            )
            if (timeValue.minute() === maxTime.value.minute()) {
              timeValue = timeValue.set(
                'second',
                Math.min(maxTime.value.second(), timeValue.second())
              )
            }
          }
        }
      }
    }

    return timeValue
  }
  // 处理mode为time时，最小最大值的处理
  const handlePickerChangeMinMaxTimeForTime = (timeValue: Dayjs): Dayjs => {
    if (timeValue.hour() === minTime.value.hour()) {
      timeValue = timeValue.set(
        'minute',
        Math.max(minTime.value.minute(), timeValue.minute())
      )
      if (timeValue.minute() === minTime.value.minute()) {
        timeValue = timeValue.set(
          'second',
          Math.max(minTime.value.second(), timeValue.second())
        )
      }
    }
    if (timeValue.hour() === maxTime.value.hour()) {
      timeValue = timeValue.set(
        'minute',
        Math.min(maxTime.value.minute(), timeValue.minute())
      )
      if (timeValue.minute() === maxTime.value.minute()) {
        timeValue = timeValue.set(
          'second',
          Math.min(maxTime.value.second(), timeValue.second())
        )
      }
    }
    return timeValue
  }
  /* 处理picker发生修改后最小最大值 end */

  return {
    handlePickerChangeMinMaxTime,
  }
}
