import { nextTick, provide, reactive, ref, toRefs, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { collapseContextKey } from '../../../../tokens'
import { useOrderedChildren } from '../../../../hooks'
import { isArray, isNumber } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { CollapseItemContext } from '../../../../tokens'
import type {
  CollapseEmits,
  CollapseModelValue,
  CollapseProps,
} from '../collapse'

export const useCollapse = (
  props: CollapseProps,
  emits: SetupContext<CollapseEmits>['emit']
) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
  } = useOrderedChildren<CollapseItemContext>()
  // 当前已激活的面板对应的uid
  const activeUid = ref<number[]>([])
  const currentActiveIndex = ref<CollapseModelValue>()

  // 根据modelValue更新activeUID的值
  const updateActiveUIDWithModelValue = (val?: CollapseModelValue) => {
    nextTick(() => {
      let activeIndex: number[]
      if (val === undefined || val === -1) {
        activeIndex = []
      } else if (isNumber(val)) {
        activeIndex = [val]
      } else {
        activeIndex = [...val]
      }

      activeUid.value = items.value
        .filter((uid, index) => activeIndex.includes(index))
        .map((item) => item.uid)
    })
  }

  let innerUpdate = false
  watch(
    () => props.modelValue,
    (val) => {
      if (innerUpdate) {
        innerUpdate = false
        return
      }
      currentActiveIndex.value = val
      updateActiveUIDWithModelValue(val)
    },
    {
      immediate: true,
    }
  )

  // 处理CollapseItem点击事件
  const handleItemClick = (uid: number) => {
    const { accordion } = props
    // 获取对应uid对应的索引
    const uidIndex = items.value.findIndex((item) => item.uid === uid)
    const isActive = activeUid.value.includes(uid)
    let value: CollapseModelValue

    // 判断是否为手风琴效果
    if (accordion) {
      // 判断是否已经为激活状态，如果是激活状态则取消激活，否则设置为其他面板激活
      if (isActive) {
        value = -1
      } else {
        value = uidIndex
      }
    } else {
      // 判断是否存在于激活面板中，如果存在则取消激活，否则添加到激活面板中
      if (isActive) {
        value = (currentActiveIndex.value as number[]).filter(
          (item) => item !== uidIndex
        )
      } else {
        if (currentActiveIndex.value && isArray(currentActiveIndex.value)) {
          value = [...currentActiveIndex.value, uidIndex]
        } else {
          value = !currentActiveIndex.value
            ? [uidIndex]
            : [currentActiveIndex.value, uidIndex]
        }
      }
    }

    // 触发更新事件
    innerUpdate = true
    currentActiveIndex.value = value
    emits(UPDATE_MODEL_EVENT, value)
    updateActiveUIDWithModelValue(value)
    nextTick(() => {
      emits(CHANGE_EVENT, value)
    })
  }

  provide(
    collapseContextKey,
    reactive({
      ...toRefs(props),

      items,
      addItem,
      removeItem,

      activeUid,
      handleItemClick,
    })
  )
}
