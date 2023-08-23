import { withNoopInstall } from '../../utils'
import LazyLoad from './src/lazy-load.vue'

export const TnLazyLoad = withNoopInstall(LazyLoad)
export default TnLazyLoad

export * from './src/lazy-load'
export type { TnLazyLoadInstance } from './src/instance'
