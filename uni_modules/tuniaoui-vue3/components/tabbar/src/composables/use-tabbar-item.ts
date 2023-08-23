import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { tabbarContextKey } from '../../../../tokens'
import { useSelectorQuery } from '../../../../hooks'
import { debugWarn, generateId } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { TabbarItemEmits, TabbarItemProps } from '../tabbar-item'
import type { TabbarItemRect } from '../types'

export const useTabbarItem = (
  props: TabbarItemProps,
  emit: SetupContext<TabbarItemEmits>['emit']
) => {
  const tabbarContext = inject(tabbarContextKey)
  // instance
  const instance = getCurrentInstance()!
  if (!tabbarContext) {
    debugWarn('TnTabbarItem', 'TnTabbarItem必须在TnTabbar中使用')
  }
  if (!instance) {
    debugWarn('TnTabbarItem', 'TnTabbarItem必须在setup中使用')
  }

  const uid = instance.uid || generateId()
  const itemId = `tti-${uid}`

  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 当前Item是否已激活
  const isActive = computed<boolean>(() => tabbarContext?.activeUid === uid)

  // 图标尺寸
  const iconSize = computed<string>(
    () => props.iconSize || tabbarContext?.iconSize || ''
  )

  // item点击事件
  const itemClick = () => {
    if (isActive.value || props.disabled) return

    tabbarContext?.setActiveItem(uid)

    emit('click')
  }

  const itemRectInfo = ref<TabbarItemRect>({
    width: 0,
    height: 0,
    left: 0,
  })
  let initRectCount = 0
  // 获取容器节点信息
  const getItemRectInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${itemId}`)
      if (rectInfo.width && rectInfo.width < 30) {
        throw new Error('获取TabbarItem节点宽度失败')
      }

      initRectCount = 0
      itemRectInfo.value.width = rectInfo.width || 0
      itemRectInfo.value.height = rectInfo.height || 0
      itemRectInfo.value.left = rectInfo.left || 0

      if (itemRectInfo.value.width > 80) {
        itemRectInfo.value.maxWidth = 80
      }

      tabbarContext?.setBulgeCircle(itemRectInfo.value)
    } catch (err) {
      if (initRectCount > 10) {
        initRectCount = 0
        debugWarn('TnTabbarItem', `获取TabbarItem节点信息失败: ${err}`)
        return
      }
      initRectCount++
      setTimeout(() => {
        getItemRectInfo()
      }, 150)
    }
  }

  tabbarContext?.addItem({
    uid,
  })
  onMounted(() => {
    nextTick(() => {
      if (props.bulge) getItemRectInfo()
    })
  })

  onUnmounted(() => {
    tabbarContext?.removeItem(uid)
  })

  return {
    itemId,
    isActive,
    itemRectInfo,
    iconSize,
    itemClick,
  }
}
