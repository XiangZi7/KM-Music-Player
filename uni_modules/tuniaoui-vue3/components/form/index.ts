import { withInstall, withNoopInstall } from '../../utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const TnForm = withInstall(Form, {
  FormItem,
})
export default TnForm
export const TnFormItem = withNoopInstall(FormItem)

export * from './src/form'
export * from './src/form-item'
export * from './src/types'

export * from './src/composables'

export type { TnFormInstance, TnFormItemInstance } from './src/instance'
