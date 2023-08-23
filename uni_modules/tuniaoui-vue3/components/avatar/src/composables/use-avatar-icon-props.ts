import { computed, inject } from 'vue'
import { avatarGroupContextKey } from '../../../../tokens'

import type { AvatarProps } from '../avatar'

export const useAvatarIconConfig = (config: AvatarProps['iconConfig']) => {
  const avatarGroup = inject(avatarGroupContextKey, undefined)

  // 图标颜色
  const iconColor = computed<string>(() => {
    return config?.color || avatarGroup?.iconConfig?.color || ''
  })

  // 图标大小
  const iconSize = computed<string | number>(() => {
    return config?.size || avatarGroup?.iconConfig?.size || ''
  })

  // 图标加粗
  const iconBold = computed<boolean>(() => {
    return config?.bold || avatarGroup?.iconConfig?.bold || false
  })

  return {
    iconColor,
    iconSize,
    iconBold,
  }
}
