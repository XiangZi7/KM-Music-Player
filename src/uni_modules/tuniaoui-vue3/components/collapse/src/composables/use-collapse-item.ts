import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue'
import { collapseContextKey } from '../../../../tokens'
import { useSelectorQuery } from '../../../../hooks'
import {
  debugWarn,
  generateId,
  isEmptyVariableInDefault,
} from '../../../../utils'

import type { CollapseItemProps } from '../collapse-item'

export const useCollapseItem = (props: CollapseItemProps) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnCollapseItem', '请在 setup 函数中使用 TnCollapseItem')
  }
  const { uid } = instance!

  const collapse = inject(collapseContextKey)
  if (!collapse) {
    debugWarn('TnCollapseItem', '请在 TnCollapse 中使用 TnCollapseItem')
  }

  collapse?.addItem({ uid })

  const componentContentId = `tcic-${generateId()}`
  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 当前组件是否为激活状态
  const isActive = computed<boolean>(() => {
    if (!collapse) return false
    return collapse.activeUid.includes(uid)
  })

  // 是否显示折叠面板箭头
  const showArrow = computed<boolean>(() =>
    isEmptyVariableInDefault(collapse?.showArrow, false)
  )

  // 组件内容的高度
  const compoenntContentDefaultHeight = ref<number>(0)
  const componentTitleHeight = ref<number>(uni.upx2px(100))
  const componentHeight = computed<string>(() => {
    if (!isActive.value) return `${componentTitleHeight.value}px`
    else
      return `${
        componentTitleHeight.value + compoenntContentDefaultHeight.value
      }px`
  })

  let initCount = 0
  // 获取内容容器高度
  const getComponentContentHeight = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentContentId}`)

      initCount = 0
      compoenntContentDefaultHeight.value = rectInfo.height || 0
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnCollapseItem', `获取内容高度失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getComponentContentHeight()
      }, 150)
    }
  }

  // CollapseItem 点击事件
  const collapseItemClick = () => {
    if (props.disabled) return
    collapse?.handleItemClick(uid)
  }

  onMounted(() => {
    nextTick(() => {
      getComponentContentHeight()
    })
  })

  return {
    componentContentId,
    showArrow,
    isActive,
    componentHeight,
    collapseItemClick,
  }
}
