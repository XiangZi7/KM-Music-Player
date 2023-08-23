import { withInstall, withNoopInstall } from '../../utils'
import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

export const TnCheckbox = withInstall(Checkbox, {
  CheckboxGroup,
})
export default TnCheckbox
export const TnCheckboxGroup = withNoopInstall(CheckboxGroup)

export * from './src/checkbox'
export * from './src/checkbox-group'
export type { CheckboxInstance, CheckboxGroupInstance } from './src/instance'
