import { withInstall, withNoopInstall } from '../../utils'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'

export const TnRadio = withInstall(Radio, {
  RadioGroup,
})
export default TnRadio
export const TnRadioGroup = withNoopInstall(RadioGroup)

export * from './src/radio'
export * from './src/radio-group'
export type { RadioInstance, RadioGroupInstance } from './src/instance'
