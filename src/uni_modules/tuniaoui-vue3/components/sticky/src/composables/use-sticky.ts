import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { useObserver, useSelectorQuery } from '../../../../hooks'
import {
  debugWarn,
  generateId,
  isEmptyVariableInDefault,
} from '../../../../utils'
import { useStickySupport } from './use-sticky-support'

import type { StickyProps } from '../sticky'
import type { StickyRectInfo } from '../types'

export const useSticky = (props: StickyProps) => {
  const instance = getCurrentInstance()

  if (!instance) {
    debugWarn('TnSticky', 'useSticky 必须在 setup 中使用')
  }
  const { emit } = instance!

  // 组件id
  const componentId = `ts-${generateId()}`

  const { supportCSSSticky, checkCSSStickySupport } = useStickySupport()
  const { connectObserver, disconnectObserver } = useObserver(instance)
  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 吸顶的距离
  const stickyDistance = computed<number>(() =>
    isEmptyVariableInDefault(props?.offsetTop, 0)
  )

  // 是否吸顶
  const stickyStatus = ref<boolean>(false)
  // 设置吸顶的状态
  const setStickyStatus = (status: boolean) => {
    if (status) {
      emit('change', true)
    } else if (stickyStatus.value) {
      emit('change', false)
    }
    stickyStatus.value = status
  }

  // 初始化节点次数
  let initCount = 0
  // sticky容器节点信息，防止在js模式下设置为fixed后元素塌陷无法进行交互
  const stickyContainerRect = ref<StickyRectInfo>({
    width: 'auto',
    height: 'auto',
    left: 0,
  })
  // 监听节点信息
  const monitorNodeInfo = () => {
    connectObserver(
      `#${componentId}`,
      (observerRes) => {
        if (!props.enabled) return
        setStickyStatus(
          observerRes.boundingClientRect.top <= stickyDistance.value
        )
      },
      {
        type: 'relativeToViewport',
        margins: {
          top: -stickyDistance.value,
        },
      },
      {
        thresholds: [0.95, 0.98, 1],
      }
    )
  }
  // 初始化Observer
  const initObserver = async () => {
    disconnectObserver()
    try {
      const rectInfo = await getSelectorNodeInfo(`#${componentId}`)

      initCount = 0
      // 设置容器信息
      stickyContainerRect.value.width = rectInfo.width || 0
      stickyContainerRect.value.height = rectInfo.height || 0
      stickyContainerRect.value.left = rectInfo.left || 0

      nextTick(() => {
        monitorNodeInfo()
      })
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn('TnSticky', `获取sticky节点信息失败: ${err}`)
        return
      }
      initCount++
      setTimeout(() => {
        initObserver()
      }, 150)
    }
  }

  watch(
    () => supportCSSSticky.value,
    (val) => {
      if (val === false && props.enabled) {
        initObserver()
      }
    }
  )

  // 如果修改了吸顶高度则重新进行监听
  watch(
    () => props.offsetTop,
    () => {
      nextTick(() => {
        initSticky()
      })
    }
  )

  // 监听是否动态设置吸顶状态
  watch(
    () => props.enabled,
    (val) => {
      if (!val) {
        setStickyStatus(false)
        disconnectObserver()
      } else {
        disconnectObserver()
        monitorNodeInfo()
      }
    }
  )

  // 初始化组件
  const initSticky = () => {
    checkCSSStickySupport(`#${componentId}`)
  }

  onMounted(() => {
    nextTick(() => {
      initSticky()
    })
  })

  onUnmounted(() => {
    disconnectObserver()
  })

  return {
    componentId,
    supportCSSSticky,
    stickyStatus,
    stickyContainerRect,
    stickyDistance,
  }
}
