import { computed, inject } from 'vue'
import { noticeBarKey } from '../../../../tokens'
import { isEmptyVariableInDefault } from '../../../../utils'

export const useColumnNoticeBar = () => {
  const noticeBar = inject(noticeBarKey, null)

  // 通知数据
  const data = computed<string[]>(() =>
    isEmptyVariableInDefault(noticeBar?.data, [])
  )

  // 通知切换时间
  const interval = computed<number>(() =>
    isEmptyVariableInDefault(noticeBar?.speed, 3000)
  )

  // 是否播放
  const play = computed<boolean>(() =>
    isEmptyVariableInDefault(noticeBar?.play, true)
  )

  // 是否垂直轮播
  const vertical = computed<boolean>(() => noticeBar?.direction === 'vertical')

  // 通知点击事件
  const noticeClickEvent = (index: number) => {
    noticeBar?.click(index)
  }

  return {
    data,
    interval,
    play,
    vertical,
    noticeClickEvent,
  }
}
