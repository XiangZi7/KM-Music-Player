import { withNoopInstall } from '../../utils'
import Empty from './src/empty.vue'

export const TnEmpty = withNoopInstall(Empty)
export default TnEmpty

export * from './src/empty'
export type { TnEmptyInstance } from './src/instance'
