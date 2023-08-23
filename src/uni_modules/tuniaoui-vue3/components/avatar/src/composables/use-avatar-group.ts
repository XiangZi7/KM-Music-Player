import { provide, reactive, toRefs } from 'vue'
import { avatarGroupContextKey } from '../../../../tokens'
import { useOrderedChildren } from '../../../../hooks'

import type { SetupContext } from 'vue'
import type { AvatarContext } from '../../../../tokens'
import type { AvatarGroupEmits, AvatarGroupProps } from '../avatar-group'

export const useAvatarGroup = (
  props: AvatarGroupProps,
  emits: SetupContext<AvatarGroupEmits>['emit']
) => {
  const {
    children: avatarItems,
    addChild: addItem,
    removeChild: removeItem,
  } = useOrderedChildren<AvatarContext>()

  const handleItemClick = (uid: number) => {
    // 查找出对应头像的索引
    const index = avatarItems.value.findIndex((item) => item.uid === uid)
    emits('click', index)
  }

  provide(
    avatarGroupContextKey,
    reactive({
      ...toRefs(props),

      avatarItems,
      addItem,
      removeItem,
      handleItemClick,
    })
  )
}
