import { withNoopInstall } from '../../utils'
import DateTimePicker from './src/date-time-picker.vue'

export const TnDateTimePicker = withNoopInstall(DateTimePicker)
export default TnDateTimePicker

export * from './src/date-time-picker'
export type { TnDateTimePickerInstance } from './src/instance'
