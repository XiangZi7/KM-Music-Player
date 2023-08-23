import { withNoopInstall } from '../../utils'
import RegionPicker from './src/region-picker.vue'

export const TnRegionPicker = withNoopInstall(RegionPicker)
export default TnRegionPicker

export * from './src/region-picker'
export type { TnRegionPickerInstance } from './src/instance'
