import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, definePropType, isNumber } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export interface WeekCalendarCustomData {
  date: number
  desc: string
}

export const weekCalendarProps = buildProps({
  /**
   * @description 绑定月份选中日期的值
   */
  modelValue: Number,
  /**
   * @description 选中时的背景颜色，以tn开头使用图鸟内置的颜色
   */
  activeBgColor: String,
  /**
   * @description 选中时的文字颜色，以tn开头使用图鸟内置的颜色
   */
  activeTextColor: String,
  /**
   * @description 绑定的年份，如果为空则使用当前年份
   */
  year: {
    type: [String, Number],
  },
  /**
   * @description 绑定的月份，如果为空则使用当前月份
   */
  month: {
    type: [String, Number],
  },
  /**
   * @description 最小允许选择月份的日期
   */
  minDate: {
    type: [String, Number],
  },
  /**
   * @description 最大允许选择月份的日期
   */
  maxDate: {
    type: [String, Number],
  },
  /**
   * @description 自定义数据
   */
  customData: {
    type: definePropType<Array<WeekCalendarCustomData>>(Array),
    default: () => [],
  },
})

export const weekCalendarEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  'week-change': (value: number) => isNumber(value),
}

export type WeekCalendarProps = ExtractPropTypes<typeof weekCalendarProps>
export type WeekCalendarEmits = typeof weekCalendarEmits
