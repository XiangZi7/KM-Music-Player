import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue'
import { subsectionContextKey } from '../../../../tokens'
import { useSelectorQuery } from '../../../../hooks'
import { debugWarn, generateId } from '../../../../utils'

import type { SetupContext } from 'vue'
import type {
  SubsectionItemEmits,
  SubsectionItemProps,
} from '../subsection-item'
import type { SubsectionItemRect } from '../types'

export const useSubsectionItem = (
  props: SubsectionItemProps,
  emits: SetupContext<SubsectionItemEmits>['emit']
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnSubsectionItem', '请在 setup 中使用 useSubsectionItem')
  }

  const { uid } = instance!

  const subsectionContext = inject(subsectionContextKey)
  if (!subsectionContext) {
    debugWarn('TnSubsectionItem', '请在 TnSubsection 中使用 TnSubsectionItem')
  }

  const componentId = `tsi-${generateId()}`
  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 标记当前item是否激活
  const active = computed(() => subsectionContext?.activeUid === uid)

  // 获取节点信息
  const componentRectInfo: SubsectionItemRect = {
    left: 0,
    width: 0,
  }
  let initCount = 0
  const getSubsectionItemRectInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentId}`)

      initCount = 0
      componentRectInfo.left = rectInfo.left || 0
      componentRectInfo.width = rectInfo.width || 0

      // 添加item信息
      subsectionContext?.addItem({
        ...props,
        uid,
        element: componentRectInfo,
      })
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnSubsectionItem', `获取节点信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getSubsectionItemRectInfo()
      }, 150)
    }
  }

  // item点击事件
  const itemClickEvent = () => {
    if (subsectionContext?.disabled || props.disabled) return
    subsectionContext?.setActiveItem(uid)
    emits('click', props.title!)
  }

  onMounted(() => {
    nextTick(() => {
      getSubsectionItemRectInfo()
    })
  })

  onUnmounted(() => {
    subsectionContext?.removeItem(uid)
  })

  return {
    componentId,
    active,
    itemClickEvent,
  }
}
