import { ref } from 'vue'

import type { SetupContext } from 'vue'
import type { BubbleBoxEmits, BubbleBoxProps } from '../bubble-box'
import type { BubbleBoxOptionItemData } from '../types'

export const useBubbleBox = (
  props: BubbleBoxProps,
  emits: SetupContext<BubbleBoxEmits>['emit']
) => {
  // 显示气泡弹出框
  const showBubble = ref<boolean>(false)

  const openBubbleOptions = () => {
    emits('open')
    showBubble.value = true
  }

  // 关闭气泡弹出框
  const closeBubbleOptions = () => {
    emits('close')
    showBubble.value = false
  }

  // 气泡框选项点击事件
  const bubbleOptionClickEvent = (
    item: BubbleBoxOptionItemData,
    index: number
  ) => {
    if (props.disabled || item.disabled) return
    emits('click', index)
    if (props.autoClose) closeBubbleOptions()
  }

  return {
    showBubble,
    openBubbleOptions,
    closeBubbleOptions,
    bubbleOptionClickEvent,
  }
}
