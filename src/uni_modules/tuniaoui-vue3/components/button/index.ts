import { withNoopInstall } from '../../utils'
import Button from './src/button.vue'

export const TnButton = withNoopInstall(Button)
export default TnButton

export * from './src/button'
export type { TnButtonInstance } from './src/instance'
