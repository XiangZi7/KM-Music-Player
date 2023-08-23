import {
  getCurrentInstance,
  nextTick,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import { tabbarContextKey } from '../../../../tokens'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { useOrderedChildren, useSelectorQuery } from '../../../../hooks'
import { debugWarn, generateId, isBoolean, isPromise } from '../../../../utils'

import type { TabbarItemContext } from '../../../../tokens'
import type { TabbarProps } from '../tabbar'
import type { TabbarItemRect } from '../types'

export const useTabbar = (props: TabbarProps) => {
  const { emit } = getCurrentInstance()!
  const {
    children: items,
    addChild,
    removeChild: removeItem,
  } = useOrderedChildren<TabbarItemContext>()

  const { getSelectorNodeInfo } = useSelectorQuery()

  const rectId = `tt-${generateId()}`

  const activeUid = ref<number>(-1)

  // 添加Item
  const addItem = (item: TabbarItemContext) => {
    if (props.modelValue !== undefined && activeUid.value === -1) {
      if (props.modelValue === items.value.length) {
        activeUid.value = item.uid
      }
    }
    addChild(item)
  }

  // 更新当前激活的Uid
  const updateActiveId = (uid: number, changeEmit = false) => {
    activeUid.value = uid
    const itemIndex = items.value.findIndex((item) => item.uid === uid)

    emit(UPDATE_MODEL_EVENT, itemIndex)
    if (changeEmit) {
      nextTick(() => {
        emit(CHANGE_EVENT, itemIndex)
      })
    }
  }

  // 设置当前被点击Item
  const setActiveItem = (uid: number) => {
    // 是否有切换拦截
    if (!props.beforeSwitch) {
      updateActiveId(uid, true)
      return
    }

    const index = items.value.findIndex((item) => item.uid === uid)
    const shouldSwitch = props.beforeSwitch(index)
    const isPromiseOrBoolean = [
      isPromise(shouldSwitch),
      isBoolean(shouldSwitch),
    ].includes(true)

    if (!isPromiseOrBoolean) {
      debugWarn(
        'TnTabbar',
        'beforeSwitch切换前拦截函数必须返回Promise或者Boolean'
      )
      return
    }

    if (isPromise(shouldSwitch)) {
      shouldSwitch.then((res) => {
        if (res) updateActiveId(uid, true)
      })
    } else {
      if (shouldSwitch) updateActiveId(uid, true)
    }
  }

  // 根据modelValue设置当前激活的Item
  const setActiveItemByValue = (value?: number) => {
    if (value === undefined || !items.value?.[value]) {
      // 设置第一个Item为激活状态
      updateActiveId(items.value[0].uid)
    } else {
      updateActiveId(items.value[value].uid)
    }
  }

  watch(
    () => props.modelValue,
    (val) => {
      nextTick(() => {
        setActiveItemByValue(val)
      })
    }
  )

  // 凸起按钮节点信息
  const bulgeRectInfo = ref<TabbarItemRect>({
    width: 0,
    height: 0,
    left: 0,
  })
  // 是否设置凸起按钮
  const hasBulgeButton = ref<boolean>(false)
  // 设置凸起按钮的位置
  const setBulgeCircle = async (itemRectInfo: TabbarItemRect) => {
    const { left } = itemRectInfo
    try {
      const rectInfo = await getSelectorNodeInfo(`#${rectId}`)

      const { left: tabbarRectLeft } = rectInfo
      let width = itemRectInfo.width
      if (itemRectInfo?.maxWidth) {
        width = itemRectInfo.maxWidth
      }
      bulgeRectInfo.value.width = width * 0.75
      bulgeRectInfo.value.height = bulgeRectInfo.value.width
      bulgeRectInfo.value.left =
        left - (tabbarRectLeft || 0) + itemRectInfo.width / 2

      hasBulgeButton.value = true
    } catch (err) {
      debugWarn('TnTabbar', `获取Tabbar节点信息失败: ${err}`)
    }
  }

  // provide
  provide(
    tabbarContextKey,
    reactive({
      ...toRefs(props),

      items,
      activeUid,
      addItem,
      removeItem,
      setActiveItem,
      setBulgeCircle,
    })
  )

  return {
    rectId,
    hasBulgeButton,
    bulgeRectInfo,
    setActiveItem,
    setActiveItemByValue,
  }
}
