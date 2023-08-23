import { computed, getCurrentInstance, nextTick, ref, toRef, watch } from 'vue'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../../constants'
import { useLongPress } from '../../../../hooks'
import { debugWarn, isEmptyVariableInDefault } from '../../../../utils'
import { useFormItem } from '../../../form'

import type { NumberBoxProps } from '../number-box'

export const useNumberBox = (props: NumberBoxProps) => {
  const { emit } = getCurrentInstance()!

  const { formItem } = useFormItem()

  // 输入框的值
  const inputValue = ref<number>(0)

  // 更新输入框的值
  watch(
    () => props.modelValue,
    (val) => {
      const value = isEmptyVariableInDefault(val, 0)
      inputValue.value = Math.max(props.min, Math.min(value, props.max))
    },
    {
      immediate: true,
    }
  )

  // 步进值
  const step = computed<number>(() => props.step || 1)

  const operationEvent = (type: 'minus' | 'plus') => {
    if (props.disabled) return
    let value = inputValue.value
    if (type === 'minus') value -= step.value
    else if (type === 'plus') value += step.value

    if (value < props.min) {
      value = props.min
      props.longPress && clearLongPressTimer()
    }
    if (value > props.max) {
      value = props.max
      props.longPress && clearLongPressTimer()
    }
    updateNumberBoxValue(value)
  }

  const { clearLongPressTimer, handleLongPressEvent: handleOperationEvent } =
    useLongPress<['minus' | 'plus']>(
      operationEvent,
      toRef(props, 'longPress'),
      props.longPressInterval
    )

  // input输入框输入事件
  const numberBoxInputEvent = (e: any) => {
    const inputEventValue = e.detail.value || 0
    let value = Number(inputEventValue)
    // 判断边缘值
    if (value < props.min) {
      value = props.min
    }
    if (value > props.max) {
      value = props.max
    }

    emit(INPUT_EVENT, inputEventValue)
    if (props.validateEvent) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      formItem?.validate('input').catch(() => {})
    }

    // isInnerUpdate = true
    // inputValue.value = inputEventValue
    // nextTick(() => {
    //   setTimeout(() => {
    //     inputValue.value = value
    //   }, 0)
    // })
    updateNumberBoxValue(value)
  }

  // 更新步进器的值
  const updateNumberBoxValue = (value: number) => {
    // 获取step的小数位
    const stepValueArray: string[] = step.value.toString().split('.')
    const decimalCount: number =
      stepValueArray.length > 1 ? stepValueArray[1].length : 0
    value = Number(value.toFixed(decimalCount))
    nextTick(() => {
      setTimeout(() => {
        inputValue.value = value
      }, 0)
    })
    emit(UPDATE_MODEL_EVENT, value)
    nextTick(() => {
      emit(CHANGE_EVENT, value)
      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err) => {
          debugWarn(err)
        })
      }
    })
  }

  return {
    inputValue,
    handleOperationEvent,
    clearLongPressTimer,
    numberBoxInputEvent,
  }
}
