import { nextTick, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { useFormItem } from '../../../form'
import { debugWarn } from '../../../../utils'

import type { SetupContext } from 'vue'
import type {
  CheckboxGroupEmits,
  CheckboxGroupProps,
  CheckboxGroupValueType,
} from '../checkbox-group'

export const useCheckboxGroup = (
  props: CheckboxGroupProps,
  emits: SetupContext<CheckboxGroupEmits>['emit']
) => {
  const { formItem } = useFormItem()

  // 更新复选框组的值
  const changeEvent = (val: CheckboxGroupValueType[number]) => {
    const { modelValue, max } = props
    const selectValues = [...modelValue]
    // 判断更新的值是否已经存在于复选框组中
    const hasLabel = selectValues.includes(val)
    if (hasLabel) {
      // 存在则删除
      selectValues.splice(selectValues.indexOf(val), 1)
    } else {
      // 不存在则添加，判断是否超过最大值
      if (max && selectValues.length >= max) {
        return
      }
      // 如果没有设置最大值，则直接添加
      selectValues.push(val)
    }
    emits(UPDATE_MODEL_EVENT, selectValues)
    nextTick(() => {
      emits(CHANGE_EVENT, selectValues)
    })
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
    changeEvent,
  }
}
