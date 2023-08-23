import { withNoopInstall } from '../../utils'
import CountTo from './src/count-to.vue'

export const TnCountTo = withNoopInstall(CountTo)
export default TnCountTo

export type { TnCountToInstance } from './src/instance'
