import { withInstall, withNoopInstall } from '../../utils'

import Avatar from './src/avatar.vue'
import AvatarGroup from './src/avatar-group.vue'

export const TnAvatar = withInstall(Avatar, {
  AvatarGroup,
})
export const TnAvatarGroup = withNoopInstall(AvatarGroup)
export default TnAvatar

export * from './src/avatar'
export * from './src/avatar-group'
export type { AvatarInstance, AvatarGroupInstance } from './src/instance'
