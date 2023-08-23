import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue'
import { stepsContextKey } from '../../../../tokens'
import { debugWarn } from '../../../../utils'

import type { StepProps } from '../steps-item'
import type { StepsMode } from '../steps'

export const useStep = (props: StepProps) => {
  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnStep', '请在 setup 中使用 useStep')
  }

  const { emit, uid } = instance!

  const stepsContext = inject(stepsContextKey)

  // 判断当前是否被激活
  const isActive = computed<boolean>(
    () => stepsContext?.activeUidList.includes(uid) || false
  )

  // 步骤条模式
  const stepMode = computed<StepsMode>(() => stepsContext?.mode || 'dot')

  // item点击事件
  const itemClickEvent = () => {
    if (props.disabled || stepsContext?.disabled) return

    stepsContext?.setActiveItem(uid)

    emit('click')
  }

  onMounted(() => {
    nextTick(() => {
      stepsContext?.addItem({ uid })
    })
  })

  onUnmounted(() => {
    stepsContext?.removeItem(uid)
  })

  return {
    isActive,
    stepMode,
    itemClickEvent,
  }
}
