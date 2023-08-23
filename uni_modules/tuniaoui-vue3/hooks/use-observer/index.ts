import { getCurrentInstance } from 'vue'
import { debugWarn } from '../../utils'

import type { ComponentInternalInstance } from 'vue'

export interface ObserverFnOptions {
  type: 'relativeTo' | 'relativeToViewport'
  selector?: string
  margins: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
}

export const useObserver = (instance?: ComponentInternalInstance | null) => {
  if (!instance) {
    instance = getCurrentInstance()
  }

  // #ifdef H5 | APP-PLUS
  instance = instance?.proxy?.$parent as ComponentInternalInstance | null
  // #endif

  if (!instance) {
    debugWarn('useObserver', '请在 setup 中使用 useObserver')
  }

  // Observer对象
  let observerInstance: UniApp.IntersectionObserver | null = null

  const connectObserver = (
    selector: string,
    fn: (res: UniApp.ObserveResult) => void,
    fnOptions: ObserverFnOptions,
    options?: UniApp.CreateIntersectionObserverOptions
  ) => {
    // 开始监听布局之前先停止旧的监听
    disconnectObserver()

    observerInstance = uni.createIntersectionObserver(instance, options)
    if (fnOptions.type === 'relativeTo')
      observerInstance.relativeTo(fnOptions?.selector || '', fnOptions.margins)
    else if (fnOptions.type === 'relativeToViewport')
      observerInstance.relativeToViewport(fnOptions.margins)

    observerInstance.observe(selector, (res) => {
      fn && fn(res)
    })
  }

  // 停止监听布局状态
  const disconnectObserver = () => {
    if (observerInstance) {
      observerInstance.disconnect()
      observerInstance = null
    }
  }

  return {
    connectObserver,
    disconnectObserver,
  }
}
