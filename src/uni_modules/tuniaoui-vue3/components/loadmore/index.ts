import { withNoopInstall } from '../../utils'
import Loadmore from './src/loadmore.vue'

export const TnLoadmore = withNoopInstall(Loadmore)
export default TnLoadmore

export * from './src/loadmore'
export type { TnLoadmoreInstance } from './src/instance'
