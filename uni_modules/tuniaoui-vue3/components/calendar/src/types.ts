import type { Dayjs } from '../../../libs/dayjs'

export type CalendarItemDateStatus = 'normal' | 'active' | 'range' | 'disabled'
export interface CalendarItem {
  /**
   * @description 日期
   */
  date: number
  /**
   * @description 日期状态
   */
  status: CalendarItemDateStatus
  /**
   * @description 日期描述，可以存放农历、开始结束提示信息
   */
  desc?: string
}

export interface CalendarMonthData {
  /**
   * @description 月份
   */
  month: number
  /**
   * @description 月份的数据
   */
  data: CalendarItem[]
}

export type CalendarData = CalendarMonthData[]

export interface DateData {
  year: number
  month: number
  date: number
}

export type CalendarSelectDataMap = Map<number, number[]>

export type CalendarRangeSelectData = {
  start?: Dayjs
  end?: Dayjs
}
