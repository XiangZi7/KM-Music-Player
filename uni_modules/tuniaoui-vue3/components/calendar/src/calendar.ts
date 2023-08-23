import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import {
  buildProps,
  definePropType,
  isArray,
  isNumber,
  isString,
} from '../../../utils'

import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '../../../utils'

export const calendarModes = ['date', 'multi', 'range'] as const

export type CalendarModelValueType = Arrayable<string>

export const calendarProps = buildProps({
  /**
   * @description 日期绑定的值，支持的格式为 YYYY/MM/DD 2023/01/01 或者 YYYY-MM-DD 2023-01-01 [2023/01/01, 2023/01/02] [2023-01-01, 2023-01-02]
   */
  modelValue: {
    type: definePropType<CalendarModelValueType>([String, Array]),
    default: '',
  },
  /**
   * @description 选中时的背景颜色，以tn开头使用图鸟内置的颜色
   */
  activeBgColor: String,
  /**
   * @description 选中时的文字颜色，以tn开头使用图鸟内置的颜色
   */
  activeTextColor: String,
  /**
   * @description 在日期范围内的背景颜色，以tn开头使用图鸟内置的颜色
   */
  rangeBgColor: String,
  /**
   * @description 在日期范围内的文字颜色，以tn开头使用图鸟内置的颜色
   */
  rangeTextColor: String,
  /**
   * @description 日期模式
   */
  mode: {
    type: String,
    values: calendarModes,
    default: 'date',
  },
  /**
   * @description 日期最小值，支持的格式为 YYYY/MM/DD 或者 YYYY-MM-DD，如果没有设置最小值则以当前日期作为最小值
   */
  minDate: String,
  /**
   * @description 日期最大值，支持的格式为 YYYY/MM/DD 或者 YYYY-MM-DD，如果没有设置最大值则以当前年份最后一天作为最大值
   */
  maxDate: String,
  /**
   * @description 是否允许切换年份
   */
  allowChangeYear: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否允许切换月份
   */
  allowChangeMonth: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示农历
   */
  showLunar: Boolean,
  /**
   * @description 当 mode 为 range 时，开始时间的提示信息
   */
  rangeStartDesc: {
    type: String,
    default: '开始',
  },
  /**
   * @description 当 mode 为 range 时，结束时间的提示信息
   */
  rangeEndDesc: {
    type: String,
    default: '结束',
  },
})

export const calendarEmits = {
  [UPDATE_MODEL_EVENT]: (value: CalendarModelValueType) =>
    isArray(value) || isString(value),
  [CHANGE_EVENT]: (value: CalendarModelValueType) =>
    isArray(value) || isString(value),
  /**
   * @description 年份切换事件
   */
  'change-year': (year: number) => isNumber(year),
  /**
   * @description 月份切换事件
   */
  'change-month': (month: number) => isNumber(month),
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarEmits = typeof calendarEmits

export type CalendarMode = (typeof calendarModes)[number]
