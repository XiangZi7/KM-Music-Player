import { withInstall, withNoopInstall } from '../../utils'
import Tabs from './src/tabs.vue'
import TabsItem from './src/tabs-item.vue'

export const TnTabs = withInstall(Tabs, {
  TabsItem,
})
export const TnTabsItem = withNoopInstall(TabsItem)
export default TnTabs

export * from './src/tabs'
export * from './src/tabs-item'
export * from './src/types'

export type { TnTabsInstance, TnTabsItemInstance } from './src/instance'
