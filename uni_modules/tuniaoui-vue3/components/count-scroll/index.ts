import { withNoopInstall } from '../../utils'
import CountScroll from './src/count-scroll.vue'

export const TnCountScroll = withNoopInstall(CountScroll)
export default TnCountScroll

export type { TnCountScrollInstance } from './src/instance'
