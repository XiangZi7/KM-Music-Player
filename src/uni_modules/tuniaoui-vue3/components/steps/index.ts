import { withInstall, withNoopInstall } from '../../utils'
import Steps from './src/steps.vue'
import StepsItem from './src/steps-item.vue'

export const TnSteps = withInstall(Steps, {
  StepsItem,
})
export const TnStepsItem = withNoopInstall(StepsItem)
export default TnSteps

export * from './src/steps'
export * from './src/steps-item'
export * from './src/types'

export type { TnStepsInstance, TnStepsItemInstance } from './src/instance'
