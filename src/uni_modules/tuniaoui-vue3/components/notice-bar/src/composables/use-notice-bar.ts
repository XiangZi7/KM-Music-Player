import { computed, provide, reactive, toRefs } from 'vue'
import { noticeBarKey } from '../../../../tokens'

import type { SetupContext } from 'vue'
import type { NoticeBarEmits, NoticeBarProps } from '../notice-bar'

export const useNoticeBar = (
  props: NoticeBarProps,
  emits: SetupContext<NoticeBarEmits>['emit']
) => {
  // 显示通知栏
  const showNoticeBar = computed(() => {
    return props.show && !(props.autoHide && props.data.length === 0)
  })

  // 播放状态
  const play = computed(() => !props.pause)

  // 通知栏点击事件
  const click = (index: number) => {
    emits('click', index)
  }
  // 左图标点击事件
  const leftIconClick = () => {
    emits('left-icon-click')
  }
  // 右图标点击事件
  const rightIconClick = () => {
    emits('right-icon-click')
  }

  provide(
    noticeBarKey,
    reactive({
      ...toRefs(props),
      play,

      click,
    })
  )

  return {
    showNoticeBar,
    leftIconClick,
    rightIconClick,
  }
}
