import { withNoopInstall } from '../../utils'
import Overlay from './src/overlay.vue'

export const TnOverlay = withNoopInstall(Overlay)
export default TnOverlay

export * from './src/overlay'
export type { TnOverlayInstance } from './src/instance'
