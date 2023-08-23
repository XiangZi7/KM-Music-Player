import type { Ref } from 'vue'

export const useLongPress = <T extends any[]>(
  event: (...args: T) => void,
  enabled: Ref<boolean>,
  longPressIntervel = 250
) => {
  // 长按判断定时器
  let longPressTimer: ReturnType<typeof setTimeout> | null = null

  // 清除长按判断定时器
  const clearLongPressTimer = () => {
    if (longPressTimer) {
      clearInterval(longPressTimer)
      longPressTimer = null
    }
  }

  // 处理长按事件
  const handleLongPressEvent = (...args: T) => {
    if (enabled.value) {
      event(...args)
      clearLongPressTimer()
      longPressTimer = setInterval(() => {
        event(...args)
      }, longPressIntervel)
    } else {
      event(...args)
    }
  }

  return {
    handleLongPressEvent,
    clearLongPressTimer,
  }
}
