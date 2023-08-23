import { withNoopInstall } from '../../utils'

import Loading from './src/loading.vue'

export const TnLoading = withNoopInstall(Loading)
export default TnLoading

export * from './src/loading'
export type { LoadingInstance } from './src/instance'
