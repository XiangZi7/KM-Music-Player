import { withNoopInstall } from '../../utils'
import Calendar from './src/calendar.vue'

export const TnCalendar = withNoopInstall(Calendar)
export default TnCalendar

export * from './src/calendar'
export type { TnCalendarInstance } from './src/instance'
