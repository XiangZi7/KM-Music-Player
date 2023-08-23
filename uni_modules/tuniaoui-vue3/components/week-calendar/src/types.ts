export type WeekCalanderDateStatus = 'active' | 'normal' | 'disabled'

export type WeekCalendarData = Array<Array<WeekCalendarItem>>

export interface WeekCalendarItem {
  date: number
  status: WeekCalanderDateStatus
  desc?: string
}
