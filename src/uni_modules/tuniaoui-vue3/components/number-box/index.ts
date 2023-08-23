import { withNoopInstall } from '../../utils'
import NumberBox from './src/number-box.vue'

export const TnNumberBox = withNoopInstall(NumberBox)
export default TnNumberBox

export * from './src/number-box'
export type { TnNumberBoxInstance } from './src/instance'
