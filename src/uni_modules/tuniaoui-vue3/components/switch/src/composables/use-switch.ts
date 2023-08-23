import { computed, getCurrentInstance, nextTick, watch } from 'vue'
import { debugWarn, isBoolean, isPromise } from '../../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { useFormItem } from '../../../form'
import { useSwitchCommonProps } from './use-switch-common-props'

import type { SwitchProps } from '../switch'

export const useSwitch = (props: SwitchProps) => {
  const { emit } = getCurrentInstance()!

  const { formItem } = useFormItem()

  const { disabled } = useSwitchCommonProps(props)

  // 判断是否为选中状态
  const selected = computed<boolean>(
    () => props.modelValue === props.activeValue
  )

  // 处理切换事件
  const handleSwitch = () => {
    const value =
      props.modelValue === props.activeValue
        ? props.inactiveValue
        : props.activeValue

    emit(UPDATE_MODEL_EVENT, value)
    nextTick(() => emit(CHANGE_EVENT, value))
  }

  // switch按钮的点击切换事件
  const switchClickEvent = () => {
    if (disabled.value || props.loading) return

    const { beforeChange } = props
    if (!beforeChange) {
      handleSwitch()
      return
    }

    const shouldChange = beforeChange()

    const isPromiseOrBool = [
      isPromise(shouldChange),
      isBoolean(shouldChange),
    ].includes(true)
    if (!isPromiseOrBool) {
      throw new Error(
        '[TnSwitch] beforeChange 返回值必须是 Promise 或者 boolean'
      )
    }

    if (isPromise(shouldChange)) {
      shouldChange
        .then((res) => {
          if (res) handleSwitch()
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(`[TnSwitch] some error occured: ${err}`)
        })
    } else if (shouldChange) {
      handleSwitch()
    }
  }

  watch(
    () => props.modelValue,
    () => {
      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err) => {
          debugWarn(err)
        })
      }
    }
  )

  return {
    selected,
    switchClickEvent,
  }
}
