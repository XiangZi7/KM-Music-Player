import { withInstall } from '../../utils'
import Input from './src/input.vue'

export const TnInput = withInstall(Input)
export default TnInput

export * from './src/input'

export type { TnInputInstance } from './src/instance'
