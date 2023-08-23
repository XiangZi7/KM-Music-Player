import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import { useSelectorQuery } from '../../../../hooks'
import { debugWarn, generateId } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { ScrollListEmits, ScrollListProps } from '../scroll-list'

export const useScrollList = (
  props: ScrollListProps,
  emits: SetupContext<ScrollListEmits>['emit']
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnScrollList', '请在setup函数中使用useScrollList')
  }

  // 内容容器id
  const componentId = `tsl-${generateId()}`
  const componentContentId = `${componentId}-content`
  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 内容容器的宽度
  let componentWidth = 0
  let comoponentContentWidth = 0

  // 滑块滑动的距离
  const indicatorBlockScrollDistance = ref<number>(0)

  let initCount = 0
  // 获取内容容器的宽度
  const getContentRectInfo = async () => {
    try {
      const componentRectInfo = await getSelectorNodeInfo(`#${componentId}`)
      const contentRectInfo = await getSelectorNodeInfo(
        `#${componentContentId}`
      )

      initCount = 0
      componentWidth = componentRectInfo.width || 0
      comoponentContentWidth = contentRectInfo.width || 0
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnScrollList', `获取内容容器的宽度失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getContentRectInfo()
      }, 150)
    }
  }

  // scrollView滚动事件
  const scrollViewScrollEvent = (e: any) => {
    const scrollLeft = e.detail.scrollLeft
    indicatorBlockScrollDistance.value =
      (scrollLeft * (props.indicatorWidth - props.indicatorBlockWidth)) /
      (comoponentContentWidth - componentWidth)
  }

  // scrollView滚动到最左边触发
  const scrollToLeftEvent = () => {
    emits('scroll-left')
  }
  // scrollView滚动到最右边触发
  const scrollToRightEvent = () => {
    emits('scroll-right')
  }

  onMounted(() => {
    nextTick(() => {
      getContentRectInfo()
    })
  })

  return {
    componentId,
    componentContentId,
    indicatorBlockScrollDistance,
    scrollViewScrollEvent,
    scrollToLeftEvent,
    scrollToRightEvent,
  }
}
