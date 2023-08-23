import { withNoopInstall } from '../../utils'
import ScrollList from './src/scroll-list.vue'

export const TnScrollList = withNoopInstall(ScrollList)
export default TnScrollList

export * from './src/scroll-list'
export type { TnScrollListInstance } from './src/instance'
