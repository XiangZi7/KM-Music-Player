import { withNoopInstall } from '../../utils'
import Icon from './src/icon.vue'

export const TnIcon = withNoopInstall(Icon)
export default TnIcon

export * from './src/icon'
export type { IconInstance } from './src/instance'
