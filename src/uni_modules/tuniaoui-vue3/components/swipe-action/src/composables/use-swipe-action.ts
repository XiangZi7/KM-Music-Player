import { provide, reactive, ref, toRefs } from 'vue'
import { swipeActionContextKey } from '../../../../tokens'
import { useOrderedChildren } from '../../../../hooks'

import type { SetupContext } from 'vue'
import type { SwipeActionItemContext } from '../../../../tokens'
import type { SwipeActionEmits, SwipeActionProps } from '../swipe-action'

export const useSwipeAction = (
  props: SwipeActionProps,
  emits: SetupContext<SwipeActionEmits>['emit']
) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
  } = useOrderedChildren<SwipeActionItemContext>()

  // 当前激活的UID
  const activeUid = ref<number[]>([])

  // 设置当前激活的item
  const setActiveItem = (uid: number) => {
    const itemIndex = items.value.findIndex((item) => item.uid === uid)
    const index = activeUid.value.indexOf(uid)
    if (props.exclusive) {
      activeUid.value = index !== -1 ? [] : [uid]
    } else {
      if (index !== -1) {
        activeUid.value.splice(index, 1)
      } else {
        activeUid.value.push(uid)
      }
    }

    emits('open', itemIndex)
  }

  // 关闭所有item的菜单
  const closeAllItemOption = () => {
    activeUid.value = []
  }

  // 回调当前点击的选项
  const optionClick = (uid: number, optionIndex: number) => {
    const itemIndex = items.value.findIndex((item) => item.uid === uid)
    emits('select', itemIndex, optionIndex)
  }

  provide(
    swipeActionContextKey,
    reactive({
      ...toRefs(props),

      items,
      addItem,
      removeItem,

      activeUid,
      setActiveItem,
      closeAllItemOption,
      optionClick,
    })
  )
}
