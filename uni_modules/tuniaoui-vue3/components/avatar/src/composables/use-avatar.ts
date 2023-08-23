import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onUnmounted,
  ref,
} from 'vue'
import { avatarGroupContextKey } from '../../../../tokens'
import { useSelectorQuery } from '../../../../hooks'
import {
  debugWarn,
  generateId,
  isEmptyVariableInDefault,
} from '../../../../utils'

import type { SetupContext } from 'vue'
import type { AvatarEmits, AvatarProps } from '../avatar'

export const useAvatar = (
  props: AvatarProps,
  emits: SetupContext<AvatarEmits>['emit']
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnAvatarGroup', '请在 setup 中使用 useAvatarGroup')
  }
  const { uid } = instance!
  const avatarGroup = inject(avatarGroupContextKey, undefined)

  avatarGroup?.addItem({ uid })

  const componentId = `ta-${generateId()}`

  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 头像组头像数量
  const groupAvatarCount = computed<number>(() => {
    return isEmptyVariableInDefault(avatarGroup?.avatarItems.length, 0)
  })
  const avatarGroupIndex = ref<number>(-1)
  nextTick(() => {
    // 获取当前头像的索引
    const avatarIndex = avatarGroup?.avatarItems.findIndex(
      (item) => item.uid === uid
    )
    avatarGroupIndex.value = isEmptyVariableInDefault(avatarIndex, -1)

    if (!avatarWidth.value && avatarGroupIndex.value !== -1) {
      getAvatarWidthNodeInfo()
    }
  })

  // 头像宽度信息
  const avatarWidth = ref<number>(0)

  // 获取头像的宽度信息
  let initCount = 0
  const getAvatarWidthNodeInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentId}`)

      if (!rectInfo.width) {
        throw new Error('获取头像宽度信息失败')
      }

      avatarWidth.value = rectInfo.width || 0
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnAvatar', `获取头像宽度信息失败：${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getAvatarWidthNodeInfo()
      }, 150)
    }
  }

  const avatarClick = () => {
    avatarGroup?.handleItemClick(uid)
    emits('click')
  }

  onUnmounted(() => {
    avatarGroup?.removeItem(uid)
  })

  return {
    componentId,
    groupAvatarCount,
    avatarGroupIndex,
    avatarWidth,
    avatarClick,
  }
}
