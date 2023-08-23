import type { InjectionKey } from 'vue'
import type {
  SubsectionItemProps,
  SubsectionItemRect,
  SubsectionProps,
} from '../components/subsection'

export type SubsectionItemContext = SubsectionItemProps & {
  uid: number
  element: SubsectionItemRect
}

export type SubsectionContext = SubsectionProps & {
  items: SubsectionItemContext[]
  activeUid: number
  addItem: (item: SubsectionItemContext) => void
  removeItem: (uid: number) => void
  setActiveItem: (uid: number) => void
}

export const subsectionContextKey: InjectionKey<SubsectionContext> = Symbol(
  'subsectionContextKey'
)
