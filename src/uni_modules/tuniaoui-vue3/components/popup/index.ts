import { withNoopInstall } from '../../utils'
import Popup from './src/popup.vue'

export const TnPopup = withNoopInstall(Popup)
export default TnPopup

export * from './src/popup'
export type { TnPopupInstance } from './src/instance'
