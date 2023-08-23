import type { InjectionKey } from 'vue'
import type { CollapseProps } from '../components/collapse'

export type CollapseItemContext = {
  uid: number
}

export type CollapseContext = Pick<
  CollapseProps,
  'showArrow' | 'arrowColor'
> & {
  items: CollapseItemContext[]
  addItem: (item: CollapseItemContext) => void
  removeItem: (uid: number) => void
  activeUid: number[]
  handleItemClick: (uid: number) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContextKey')
