import { withNoopInstall } from '../../utils'
import Switch from './src/switch.vue'

export const TnSwitch = withNoopInstall(Switch)
export default TnSwitch

export * from './src/switch'
export type { TnSwitchInstance } from './src/instance'
