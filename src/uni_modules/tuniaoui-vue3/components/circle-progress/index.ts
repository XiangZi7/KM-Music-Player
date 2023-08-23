import { withNoopInstall } from '../../utils'
import circleProgress from './src/circle-progress.vue'

export const TnCircleProgress = withNoopInstall(circleProgress)
export default TnCircleProgress

export * from './src/circle-progress'
export type { TnCircleProgressInstance } from './src/instance'
