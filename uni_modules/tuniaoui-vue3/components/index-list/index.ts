import { withNoopInstall } from '../../utils'
import IndexList from './src/index-list.vue'

export const TnIndexList = withNoopInstall(IndexList)
export default TnIndexList

export * from './src/index-list'
export type { TnIndexListInstance } from './src/instance'
