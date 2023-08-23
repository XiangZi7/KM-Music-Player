import { withNoopInstall } from '../../utils'
import Picker from './src/picker.vue'

export const TnPicker = withNoopInstall(Picker)
export default TnPicker

export * from './src/picker'
export type { TnPickerInstance } from './src/instance'
