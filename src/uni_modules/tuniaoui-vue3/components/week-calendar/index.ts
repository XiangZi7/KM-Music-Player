import { withNoopInstall } from '../../utils'
import WeekCalendar from './src/week-calendar.vue'

export const TnWeekCalendar = withNoopInstall(WeekCalendar)
export default TnWeekCalendar

export * from './src/week-calendar'
export type { TnWeekCalendarInstance } from './src/instance'
