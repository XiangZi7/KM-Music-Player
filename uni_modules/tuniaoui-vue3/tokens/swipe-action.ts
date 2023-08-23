import type { InjectionKey } from 'vue'
import type { SwipeActionProps } from '../components'

export type SwipeActionItemContext = {
  uid: number
}

export type SwiperActionContext = SwipeActionProps & {
  items: SwipeActionItemContext[]
  activeUid: number[]
  addItem: (item: SwipeActionItemContext) => void
  removeItem: (uid: number) => void
  setActiveItem: (uid: number) => void
  closeAllItemOption: () => void
  optionClick: (uid: number, optionIndex: number) => void
}

export const swipeActionContextKey: InjectionKey<SwiperActionContext> = Symbol(
  'swipeActionContextKey'
)
