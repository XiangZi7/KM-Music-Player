import { withNoopInstall } from '../../utils'
import SwitchTab from './src/switch-tab.vue'

export const TnSwitchTab = withNoopInstall(SwitchTab)
export default TnSwitchTab

export * from './src/switch-tab'
export type { TnSwitchTabInstance } from './src/instance'
