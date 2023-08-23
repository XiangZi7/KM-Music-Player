import { withNoopInstall } from '../../utils'
import waterFall from './src/water-fall.vue'

export const TnWaterFall = withNoopInstall(waterFall)
export default TnWaterFall

export * from './src/water-fall'
export type { TnWaterFallInstance } from './src/instance'
