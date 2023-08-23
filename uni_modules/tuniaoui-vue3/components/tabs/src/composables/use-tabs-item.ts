import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue'
import { tabsContextKey } from '../../../../tokens'
import { useSelectorQuery } from '../../../../hooks'
import { debugWarn, generateId, isEmpty } from '../../../../utils'

import type { TabsItemProps } from '../tabs-item'
import type { TabsItemRect } from '../types'

export const useTabsItem = (props: TabsItemProps) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnTabsItem', '请在 setup 中使用 useTabsItem')
  }

  const { emit, uid } = instance!

  const componentId = `tti-${generateId()}`

  const tabsContext = inject(tabsContextKey)

  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 当前节点是否被激活
  const isActive = computed<boolean>(() => tabsContext?.activeUid === uid)

  // 判断是否有角标
  const hasBadge = computed<boolean>(() => !isEmpty(props.badgeConfig))

  // tabsItem节点信息
  const tabsItemRect: TabsItemRect = {
    width: 0,
    height: 0,
    left: 0,
  }

  let initCount = 0
  // 初始化、获取节点信息
  const initTabsItemRectInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentId}`)

      tabsItemRect.width = rectInfo.width || 0
      tabsItemRect.height = rectInfo.height || 0
      tabsItemRect.left = rectInfo.left || 0

      // 添加item
      // #ifndef APP-PLUS || MP-ALIPAY
      tabsContext?.addItem({
        uid,
        elementRect: tabsItemRect,
      })
      // #endif
      // #ifdef APP-PLUS || MP-ALIPAY
      setTimeout(() => {
        tabsContext?.addItem({
          uid,
          elementRect: tabsItemRect,
        })
      }, 250)
      // #endif
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnTabsItem', `获取tabsItem节点信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        initTabsItemRectInfo()
      }, 150)
    }
  }

  // item点击事件
  const itemClickEvent = () => {
    if (props.disabled) return
    emit('click')
    tabsContext?.setActiveItem(uid)
  }

  onMounted(() => {
    nextTick(() => {
      // 初始化节点
      initTabsItemRectInfo()
    })
  })

  onUnmounted(() => {
    // 移除item
    tabsContext?.removeItem(uid)
  })

  return {
    componentId,
    isActive,
    hasBadge,
    itemClickEvent,
  }
}
