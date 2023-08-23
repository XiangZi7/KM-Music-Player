import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { swipeActionContextKey } from '../../../../tokens'
import { useSelectorQuery, useTouch } from '../../../../hooks'
import {
  debugWarn,
  generateId,
  isEmptyDoubleVariableInDefault,
} from '../../../../utils'

import type { SwipeActionItemProps } from '../swipe-action-item'

export const useSwipeActionItem = (props: SwipeActionItemProps) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnSwipeActionItem', '请在 setup 中使用 useSwipeActionItem')
  }
  const { uid } = instance!

  const swipeActionContext = inject(swipeActionContextKey, null)
  if (!swipeActionContext) {
    debugWarn(
      'TnSwipeActionItem',
      '请在 TnSwipeAction 中使用 TnSwipeActionItem'
    )
  }

  const componentId = `tsai-${generateId()}`
  const optionComponentClass = `${componentId}-option`

  const { getSelectorNodeInfo, getSelectorNodeInfos } =
    useSelectorQuery(instance)

  const {
    deltaX: swipeActionItemDeltaX,
    distanceX: swipeActionItemDistanceX,
    distanceY: swipeActionItemDistanceY,
    isVertical: swipeActionItemTouchIsVertical,
    updateOptions: updateSwipeActionItemTouchOptions,
    onTouchStart: swipeActionItemTouchStartEvent,
    onTouchMove: swipeActionItemTouchMoveEvent,
    onTouchEnd: swipeActionItemTouchEndEvent,
  } = useTouch()

  // 当前item的菜单是否为打开状态
  const isOptionsOpen = computed<boolean>(() =>
    swipeActionContext!.activeUid.includes(uid)
  )

  // 点击options后是否自动关闭
  const autoClose = computed<boolean>(() =>
    isEmptyDoubleVariableInDefault(
      props?.autoClose,
      swipeActionContext?.autoClose,
      true
    )
  )

  // 禁止滑动
  const disabledSwipe = computed<boolean>(
    () => props.disabled || !props.options?.length
  )
  watch(
    () => disabledSwipe.value,
    (val) => {
      updateSwipeActionItemTouchOptions({
        disabled: val,
      })
    },
    {
      immediate: true,
    }
  )

  // 操作菜单的长度
  const optionsMenuWidth = ref(0)

  // 获取当前组件节点信息
  let initCount = 0
  const getComponentNodeInfo = async () => {
    try {
      const componentRectInfo = await getSelectorNodeInfo(`#${componentId}`)
      let optionsRectInfo: UniApp.NodeInfo[] = []
      if (props.options?.length) {
        optionsRectInfo = await getSelectorNodeInfos(`.${optionComponentClass}`)
      }

      initCount = 0
      updateSwipeActionItemTouchOptions({
        left: componentRectInfo.left,
        right: componentRectInfo.right,
        top: componentRectInfo.top,
        bottom: componentRectInfo.bottom,
      })

      optionsMenuWidth.value = optionsRectInfo.reduce((prev, curr) => {
        return prev + (curr.width || 0)
      }, 0)
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnSwipeActionItem', `获取节点信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getComponentNodeInfo()
      }, 150)
    }
  }

  // 内容距离左边移动的距离
  const contentRightDistance = ref<number>(0)

  // 标记是否正在滑动，正在手动滑动的时候暂停动画
  const isSwipe = ref<boolean>(false)

  // 内容滑动事件
  const onTouchStart = (event: any) => {
    swipeActionItemTouchStartEvent(event)
  }
  const onTouchMove = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    swipeActionItemTouchMoveEvent(event)
    isSwipe.value = true
    // 如果垂直方向上的移动距离过大则不允许进行滑动
    if (
      swipeActionItemDistanceX.value < 3 &&
      swipeActionItemDistanceY.value > 5
    ) {
      return
    }

    // 如果当前菜单已经打开了则根据滑动的距离计算内容滑动的距离
    if (isOptionsOpen.value) {
      contentRightDistance.value =
        optionsMenuWidth.value - swipeActionItemDeltaX.value
    } else {
      contentRightDistance.value = -swipeActionItemDeltaX.value
    }
    if (contentRightDistance.value < 0) contentRightDistance.value = 0
    if (contentRightDistance.value > optionsMenuWidth.value)
      contentRightDistance.value = optionsMenuWidth.value
  }
  const onTouchEnd = (event: any) => {
    swipeActionItemTouchEndEvent(event)
    // 如果垂直方向上的移动距离过大则不允许进行滑动
    if (
      swipeActionItemDistanceX.value < 3 &&
      swipeActionItemDistanceY.value > 5
    ) {
      return
    }
    isSwipe.value = false
    // 如果滑动的距离大于展开阈值则显示操作菜单
    if (-swipeActionItemDeltaX.value > props.threshold) {
      openOptionsMenu()
    } else {
      closeOptionsMenu()
      updateAllItemOptionStatus()
    }

    if (swipeActionItemTouchIsVertical.value) {
      updateAllItemOptionStatus()
    }
  }

  // 关闭菜单
  const closeOptionsMenu = () => {
    isSwipe.value = false
    contentRightDistance.value = 0
  }

  // 更新所有item的菜单状态
  const updateAllItemOptionStatus = () => {
    if (isOptionsOpen.value) {
      swipeActionContext?.setActiveItem(uid)
    } else {
      if (swipeActionContext?.exclusive) {
        swipeActionContext?.closeAllItemOption()
      }
    }
  }

  // 打开菜单
  const openOptionsMenu = () => {
    isSwipe.value = false
    contentRightDistance.value = optionsMenuWidth.value
    swipeActionContext?.setActiveItem(uid)
  }

  watch(
    () => isOptionsOpen.value,
    (val) => {
      if (!val) {
        closeOptionsMenu()
      }
    }
  )

  // 监听菜单操作点击事件
  const optionClickEvent = (index: number) => {
    const option = props.options![index]
    if (option.disabled) return
    swipeActionContext?.optionClick(uid, index)
    if (autoClose.value) {
      closeOptionsMenu()
    }
  }

  onMounted(() => {
    swipeActionContext?.addItem({
      uid,
    })
    nextTick(() => {
      getComponentNodeInfo()
    })
  })

  onUnmounted(() => {
    swipeActionContext?.removeItem(uid)
  })

  return {
    componentId,
    optionComponentClass,
    isOptionsOpen,
    optionsMenuWidth,
    contentRightDistance,
    isSwipe,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    optionClickEvent,
  }
}
