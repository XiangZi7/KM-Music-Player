import { withNoopInstall } from '../../utils'
import Footer from './src/footer.vue'

export const TnFooter = withNoopInstall(Footer)
export default TnFooter

export * from './src/footer'
export type { TnFooterInstance } from './src/instance'
