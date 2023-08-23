import { withNoopInstall } from '../../utils'
import SearchBox from './src/search-box.vue'

export const TnSearchBox = withNoopInstall(SearchBox)
export default TnSearchBox

export * from './src/search-box'
export type { TnSearchBoxInstance } from './src/instance'
