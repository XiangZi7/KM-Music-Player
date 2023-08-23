import { withNoopInstall } from '../../utils'
import keyboard from './src/keyboard.vue'

export const TnKeyboard = withNoopInstall(keyboard)
export default TnKeyboard

export * from './src/keyboard'
export type { TnKeyboardInstance } from './src/instance'
