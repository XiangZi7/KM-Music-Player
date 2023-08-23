import type { InjectionKey } from 'vue'
import type { TabsItemRect, TabsProps } from '../components/tabs'

export type TabsItemContext = {
  uid: number
  elementRect: TabsItemRect
}

export type TabsContext = TabsProps & {
  items: TabsItemContext[]
  activeUid: number
  addItem: (item: TabsItemContext) => void
  removeItem: (uid: number) => void
  setActiveItem: (uid: number) => void
}

export const tabsContextKey: InjectionKey<TabsContext> =
  Symbol('tabsContextKey')
