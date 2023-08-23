import type { InjectionKey } from 'vue'
import type { AvatarGroupProps } from '../components'

export type AvatarContext = {
  uid: number
}

export type AvatarGroupContext = AvatarGroupProps & {
  avatarItems: AvatarContext[]
  addItem: (item: AvatarContext) => void
  removeItem: (uid: number) => void
  handleItemClick: (uid: number) => void
}

export const avatarGroupContextKey: InjectionKey<AvatarGroupContext> = Symbol(
  'avatarGroupContextKey'
)
