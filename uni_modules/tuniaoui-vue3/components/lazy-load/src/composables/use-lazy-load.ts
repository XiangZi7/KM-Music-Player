import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { useObserver, useSelectorQuery } from '../../../../hooks'
import {
  debugWarn,
  generateId,
  isEmptyVariableInDefault,
} from '../../../../utils'

import type { LazyLoadProps } from '../lazy-load'
import type { LazyLoadStatus } from '../types'

export const useLazyLoad = (props: LazyLoadProps) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnLazyLoad', '请在 setup 中使用 useLazyLoad')
  }

  const { emit } = instance!

  const { getSelectorNodeInfo } = useSelectorQuery(instance)
  const { connectObserver, disconnectObserver } = useObserver(instance)

  const componentId = `tll-${generateId()}`

  // 图片触发加载位置
  const threshold = computed<number>(() =>
    isEmptyVariableInDefault(props.threshold, 100)
  )

  // 图片加载状态
  const imageStatus = ref<LazyLoadStatus>('waiting')
  // 开始显示图片
  const showImage = ref<boolean>(false)

  let initCount = 0
  // 初始化监听事件
  const initObserver = async () => {
    disconnectObserver()
    try {
      await getSelectorNodeInfo(`#${componentId}`)

      initCount = 0

      const bottomThreshold =
        threshold.value < 0
          ? -Math.abs(threshold.value)
          : Math.abs(threshold.value)
      connectObserver(
        `#${componentId}`,
        (res) => {
          if (res.intersectionRatio > 0) {
            // 开始显示图片
            showImage.value = true
            imageStatus.value = 'loading'
            // 图片已加载关闭监听，减少资源消耗
            disconnectObserver()
          }
        },
        {
          type: 'relativeToViewport',
          margins: {
            bottom: bottomThreshold,
          },
        }
      )
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnLazyLoad', `获取图片节点信息失败：${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        initObserver()
      }, 150)
    }
  }

  // 图片加载完成事件
  const handleImageLoadedSuccess = () => {
    imageStatus.value = 'loaded'
    emit('loaded')
  }

  // 图片加载失败事件
  const handleImageLoadedFailed = (err: any) => {
    debugWarn('TnLazyLoad', `图片加载失败: ${err}`)
    imageStatus.value = 'error'
    emit('error')
  }

  onMounted(() => {
    nextTick(() => {
      initObserver()
    })
  })

  onUnmounted(() => {
    disconnectObserver()
  })

  return {
    componentId,
    imageStatus,
    showImage,
    handleImageLoadedSuccess,
    handleImageLoadedFailed,
  }
}
