import type { InjectionKey } from 'vue'
import type { TabbarItemRect, TabbarProps } from '../components/tabbar'

export type TabbarItemContext = {
  uid: number
}

export type TabbarContext = TabbarProps & {
  items: TabbarItemContext[]
  activeUid: number
  addItem: (item: TabbarItemContext) => void
  removeItem: (uid: number) => void
  setActiveItem: (uid: number) => void
  setBulgeCircle: (rect: TabbarItemRect) => void
}

export const tabbarContextKey: InjectionKey<TabbarContext> =
  Symbol('tabbarContextKey')
