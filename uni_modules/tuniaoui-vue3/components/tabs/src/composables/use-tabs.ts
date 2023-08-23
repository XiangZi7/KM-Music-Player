import {
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  useSlots,
  watch,
} from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { tabsContextKey } from '../../../../tokens'
import { useOrderedChildren, useSelectorQuery } from '../../../../hooks'
import { debugWarn, generateId, isBoolean, isPromise } from '../../../../utils'

import type { TabsItemContext } from '../../../../tokens'
import type { TabsProps } from '../tabs'
import type { TabsBarRect, TabsRect } from '../types'

export const useTabs = (props: TabsProps) => {
  const instance = getCurrentInstance()

  if (!instance) {
    debugWarn('TnTabs', '请在 setup 函数中使用 useTabs ')
  }

  const { emit } = instance!
  const slots = useSlots()

  const {
    children: items,
    addChild,
    removeChild: removeItem,
  } = useOrderedChildren<TabsItemContext>()
  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  const componentId = `tt-${generateId()}`
  const barComponentId = `${componentId}-b`

  // 当前被激活的ItemUid
  const activeUid = ref<number>(-1)

  // 添加tabsItem到items容器中
  const addItem = (item: TabsItemContext) => {
    if (props.modelValue !== undefined && activeUid.value === -1) {
      if (props.modelValue === items.value.length) {
        nextTick(() => {
          updateActiveUid(item.uid)
        })
      }
    }
    addChild(item)
  }

  // tabs容器节点信息
  const tabsRect: TabsRect = {
    width: 0,
    height: 0,
    left: 0,
  }

  // bar滑块的容器节点信息
  const barRect: TabsBarRect = {
    width: 0,
    height: 0,
    left: 0,
  }
  // 滑块滑动的距离
  const barOffsetLeft = ref<number>(0)
  // scrollView的滚动距离
  const scrollLeft = ref<number>(0)

  // 更新偏移位置信息
  const updateOffsetPosition = (index: number) => {
    if (!props.scroll && !props.bar && !slots.bar) return

    // 获取当前Item
    const item = items.value[index].elementRect

    if (props.bar || slots.bar) {
      // 更新滑块的偏移位置
      barOffsetLeft.value =
        item.left - tabsRect.left + (item.width - barRect.width) / 2
    }
    if (props.scroll) {
      // 更新scrollView的偏移位置
      const scrollLeftValue =
        item.left - tabsRect.left - (tabsRect.width - item.width) / 2
      scrollLeft.value = scrollLeftValue < 0 ? 0 : scrollLeftValue
    }
  }

  // 更新当前激活的ItemUid
  const updateActiveUid = (uid: number, changeEmit = false) => {
    activeUid.value = uid
    const itemIndex = items.value.findIndex((item) => item.uid === uid)

    updateOffsetPosition(itemIndex)

    emit(UPDATE_MODEL_EVENT, itemIndex)
    if (changeEmit) {
      emit(CHANGE_EVENT, itemIndex)
    }
  }

  // 设置当前被点击Item
  const setActiveItem = (uid: number) => {
    if (!props.beforeSwitch) {
      updateActiveUid(uid, true)
      return
    }

    const itemIndex = items.value.findIndex((item) => item.uid === uid)
    const shouldSwitch = props.beforeSwitch(itemIndex)
    const isPromiseOrBoolean = [
      isPromise(shouldSwitch),
      isBoolean(shouldSwitch),
    ].includes(true)

    if (!isPromiseOrBoolean) {
      debugWarn('TnTabs', 'beforeSwitch返回值必须是Promise或者Boolean')
      return
    }

    if (isPromise(shouldSwitch)) {
      shouldSwitch
        .then((res) => {
          if (res) {
            updateActiveUid(uid, true)
          }
        })
        .catch((err) => {
          debugWarn('TnTabs', `执行beforeSwitch出错：${err}`)
        })
    } else {
      if (shouldSwitch) {
        updateActiveUid(uid, true)
      }
    }
  }

  // 通过索引更新当前激活的ActiveItem
  const updateActiveItemByIndex = (index?: number) => {
    if (index === undefined || !items.value?.[index]) {
      updateActiveUid(items.value[0].uid)
    } else {
      updateActiveUid(items.value[index].uid)
    }
  }

  watch(
    () => props.modelValue,
    (val) => {
      updateActiveItemByIndex(val)
    }
  )

  let initCount = 0
  // 获取Tabs容器节点信息
  const getTabsRectInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentId}`)

      initCount = 0
      tabsRect.width = rectInfo.width || 0
      tabsRect.height = rectInfo.height || 0
      tabsRect.left = rectInfo.left || 0
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnTabs', `获取Tabs容器节点信息出错: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getTabsRectInfo()
      }, 150)
    }
  }
  // 获取Bar滑块的容器节点信息
  const getBarRectInfo = async () => {
    if (!props.bar && !slots.bar) return

    try {
      const rectInfo = await getSelectorNodeInfo(`#${barComponentId}`)

      initCount = 0
      barRect.width = rectInfo.width || 0
      barRect.height = rectInfo.height || 0
      barRect.left = rectInfo.left || 0
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnTabs', `获取Bar滑块节点信息出错: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getBarRectInfo()
      }, 150)
    }
  }

  onMounted(() => {
    nextTick(() => {
      // #ifndef MP-ALIPAY
      getTabsRectInfo()
      // #endif
      // #ifdef MP-ALIPAY
      setTimeout(() => {
        getTabsRectInfo()
      }, 50)
      // #endif
      getBarRectInfo()
    })
  })

  provide(
    tabsContextKey,
    reactive({
      ...toRefs(props),

      items,
      activeUid,
      addItem,
      removeItem,
      setActiveItem,
    })
  )

  return {
    tabItems: items,
    componentId,
    barComponentId,
    barOffsetLeft,
    scrollLeft,
  }
}
