import { withNoopInstall } from '../../utils'
import Notify from './src/notify.vue'

export const TnNotify = withNoopInstall(Notify)
export default TnNotify

export * from './src/notify'
export type { TnNotifyInstance } from './src/instance'
