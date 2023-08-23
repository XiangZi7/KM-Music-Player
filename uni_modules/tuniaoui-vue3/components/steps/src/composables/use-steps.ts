import { getCurrentInstance, provide, reactive, ref, toRefs, watch } from 'vue'
import { stepsContextKey } from '../../../../tokens'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { useOrderedChildren } from '../../../../hooks'
import { debugWarn } from '../../../../utils'

import type { StepsProps } from '../steps'
import type { StepContext } from '../../../../tokens'

export const useSteps = (props: StepsProps) => {
  const instance = getCurrentInstance()

  if (!instance) {
    debugWarn('TnSteps', '请在 setup 中使用 useSteps')
  }

  const { emit } = instance!

  const {
    children: items,
    addChild,
    removeChild: removeItem,
  } = useOrderedChildren<StepContext>()

  // 当前已激活的Uid列表
  const activeUidList = ref<number[]>([])

  let innerUpdate = false
  // 更新当前激活的Uid列表
  const setActiveUidList = (uid?: number, changeEmit = false) => {
    if (uid === undefined) {
      activeUidList.value = []
      return
    }
    // 查找出当前激活的uid的index
    const index = items.value.findIndex((item) => item.uid === uid)
    if (index === -1) return

    // 根据index查找出当前激活的uid列表
    activeUidList.value = items.value
      .slice(0, index + 1)
      .map((item) => item.uid)

    // 触发更新事件
    emit(UPDATE_MODEL_EVENT, index)
    if (changeEmit) {
      emit(CHANGE_EVENT, index)
    }
  }

  // 设置当前激活的Step
  const setActiveItem = (uid: number) => {
    if (props.disabled) return
    innerUpdate = true
    setActiveUidList(uid, true)
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (innerUpdate) {
        innerUpdate = false
        return
      }
      if (val !== undefined) {
        const uid = items.value?.[val]?.uid
        setActiveUidList(uid)
      }
    }
  )

  // 添加item到items
  const addItem = (item: StepContext) => {
    addChild(item)
    if (
      !activeUidList.value.length &&
      props.modelValue !== undefined &&
      props.modelValue >= 0
    ) {
      setActiveUidList(items.value?.[props.modelValue]?.uid)
    }
  }

  provide(
    stepsContextKey,
    reactive({
      ...toRefs(props),

      items,
      activeUidList,
      addItem,
      removeItem,
      setActiveItem,
    })
  )
}
