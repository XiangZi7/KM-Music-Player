import { withNoopInstall } from '../../utils'
import lineProgress from './src/line-progress.vue'

export const TnLineProgress = withNoopInstall(lineProgress)
export default TnLineProgress

export * from './src/line-progress'
export type { TnLineProgressInstance } from './src/instance'
