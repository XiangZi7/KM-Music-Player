import { withNoopInstall } from '../../utils'
import ListItem from './src/list-item.vue'

export const TnListItem = withNoopInstall(ListItem)
export default TnListItem

export * from './src/list-item'
export type { TnListItemInstance } from './src/instance'
