import { withInstall, withNoopInstall } from '../../utils'
import Tabbar from './src/tabbar.vue'
import TabbarItem from './src/tabbar-item.vue'

export const TnTabbar = withInstall(Tabbar, {
  TabbarItem,
})
export const TnTabbarItem = withNoopInstall(TabbarItem)
export default TnTabbar

export * from './src/tabbar'
export * from './src/tabbar-item'
export * from './src/types'
export type { TnTabbarInstance, TnTabbarItemInstance } from './src/instance'
