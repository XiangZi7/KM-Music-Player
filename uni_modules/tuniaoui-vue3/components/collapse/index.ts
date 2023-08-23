import { withInstall, withNoopInstall } from '../../utils'
import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'

export const TnCollapse = withInstall(Collapse, {
  CollapseItem,
})
export default TnCollapse
export const TnCollapseItem = withNoopInstall(CollapseItem)

export * from './src/collapse'
export * from './src/collapse-item'

export type { TnCollapseInstance, TnCollapseItemInstance } from './src/instance'
