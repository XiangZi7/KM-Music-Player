import { withNoopInstall } from '../../utils'
import Modal from './src/modal.vue'

export const TnModal = withNoopInstall(Modal)
export default TnModal

export * from './src/modal'
export type { TnModalInstance } from './src/instance'
