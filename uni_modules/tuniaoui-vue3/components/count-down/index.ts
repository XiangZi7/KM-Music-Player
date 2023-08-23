import { withNoopInstall } from '../../utils'
import CountDown from './src/count-down.vue'

export const TnCountDown = withNoopInstall(CountDown)
export default TnCountDown

export * from './src/count-down'
export type { TnCountDownInstance } from './src/instance'
