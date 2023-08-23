import { nextTick, watch } from 'vue'
import { useFormItem } from '../../../form'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { debugWarn } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { RadioGroupEmits, RadioGroupProps } from '../radio-group'

export const useRadioGroup = (
  props: RadioGroupProps,
  emits: SetupContext<RadioGroupEmits>['emit']
) => {
  const { formItem } = useFormItem()

  // 值更新事件
  const changeEvent = (val: RadioGroupProps['modelValue']) => {
    emits(UPDATE_MODEL_EVENT, val)
    nextTick(() => {
      emits(CHANGE_EVENT, val)
    })
  }

  // 当值发生改变时触发校验
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
    changeEvent,
  }
}
