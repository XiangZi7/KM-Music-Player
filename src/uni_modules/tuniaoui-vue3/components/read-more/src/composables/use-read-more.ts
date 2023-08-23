import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useSelectorQuery, useToggle } from '../../../../hooks'
import {
  debugWarn,
  formatDomSizeValue,
  generateId,
  isBoolean,
  isPromise,
} from '../../../../utils'

import type { SetupContext } from 'vue'
import type { ReadMoreEmits, ReadMoreProps } from '../read-more'

export const useReadMore = (
  props: ReadMoreProps,
  emits: SetupContext<ReadMoreEmits>['emit']
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnReadMore', '请在 setup 中使用 useReadMore')
  }

  const componentId = `trm-${generateId()}`
  const componentContentId = `${componentId}-content`

  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 是否展开状态
  const [expandStatus, toggleExpand] = useToggle(props.expand || false)

  watch(
    () => props.expand,
    (val) => {
      expandStatus.value = val
    }
  )

  // 是否显示操作区域
  const showOperationArea = computed<boolean>(
    () => !expandStatus.value || (expandStatus.value && props.showFold)
  )
  // 操作区域高度
  const foldOperationAreaHeight = 40

  // 容器高度
  const containerHeight = computed<string>(() => {
    if (!expandStatus.value) {
      return formatDomSizeValue(props.height)
    } else {
      return `calc(${formatDomSizeValue(
        contentHeight.value,
        'px'
      )} + ${foldOperationAreaHeight}rpx)`
    }
  })

  // 内容区域的高度
  let contentHeight = ref(0)

  // 获取内容区域容器信息
  let initCount = 0
  const getContentRectInfo = async () => {
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentContentId}`)

      initCount = 0
      contentHeight.value = rectInfo.height || 0
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnReadMore', `获取内容容器信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        getContentRectInfo()
      }, 150)
    }
  }
  // 重置内容容器的高度
  const resetContentHeight = () => {
    nextTick(() => {
      getContentRectInfo()
    })
  }

  // 设置为展开
  const setExpand = () => {
    emits('expand')
    toggleExpand()
  }
  // 设置为折叠
  const setFold = () => {
    emits('fold')
    toggleExpand()
  }

  // 切换折叠、展开状态
  const toggleExpandStatus = () => {
    if (expandStatus.value) {
      setFold()
    } else {
      const { beforeExpand } = props
      if (!beforeExpand) {
        setExpand()
        return
      }

      const shouldExpand = beforeExpand()
      const isPromiseOrBoolean = [
        isPromise(shouldExpand),
        isBoolean(shouldExpand),
      ].includes(true)

      if (!isPromiseOrBoolean) {
        debugWarn(
          'TnReadMore',
          'beforeExpand 必须返回 Promise 或者 boolean 类型'
        )
        return
      }

      if (isPromise(shouldExpand)) {
        shouldExpand.then((res) => {
          if (res) {
            setExpand()
          }
        })
      } else {
        if (shouldExpand) {
          setExpand()
        }
      }
    }
  }

  onMounted(() => {
    nextTick(() => {
      getContentRectInfo()
    })
  })

  return {
    componentContentId,
    showOperationArea,
    foldOperationAreaHeight,
    containerHeight,
    expandStatus,
    toggleExpandStatus,
    resetContentHeight,
  }
}
