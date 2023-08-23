import { withNoopInstall } from '../../utils'
import BubbleBox from './src/bubble-box.vue'

export const TnBubbleBox = withNoopInstall(BubbleBox)
export default TnBubbleBox

export * from './src/bubble-box'
export type { TnBubbleBoxInstance } from './src/instance'
