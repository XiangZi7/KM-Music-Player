import { withNoopInstall } from '../../utils'
import Sticky from './src/sticky.vue'

export const TnSticky = withNoopInstall(Sticky)
export default TnSticky

export * from './src/sticky'
export type { TnStickyInstance } from './src/instance'
