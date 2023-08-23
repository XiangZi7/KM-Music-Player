import { withNoopInstall } from '../../utils'
import Rate from './src/rate.vue'

export const TnRate = withNoopInstall(Rate)
export default TnRate

export * from './src/rate'
export type { TnRateInstance } from './src/instance'
