import { computed, getCurrentInstance, nextTick } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { useFormItem } from '../../../form'
import { debugWarn } from '../../../../utils'
import { useCheckboxCommonProps } from './use-checkbox-common-props'

import type { CheckboxProps } from '../checkbox'
import type { CheckboxValueType } from '../../../base/types/checkbox'

// 判断复选框组中是否包含某个值
const hasLabelInGroup = (
  groupValue: CheckboxValueType[],
  label: CheckboxValueType
) => groupValue.includes(label)

export const useCheckbox = (props: CheckboxProps) => {
  const { emit } = getCurrentInstance()!

  const { checkboxGroup, disabled, maxDisabled, labelDisabled } =
    useCheckboxCommonProps(props)

  const { formItem } = useFormItem()

  // 判断是否为复选组
  const isGroup = computed(() => !!checkboxGroup)

  // 在复选组中是否选中当前复选框
  const selected = computed(() => {
    if (isGroup.value) {
      return hasLabelInGroup(checkboxGroup!.modelValue, props.label!)
    } else {
      return props.modelValue === props.activeValue
    }
  })

  // 复选框点击事件
  const handleCheckboxClick = (type: 'checkbox' | 'label') => {
    if (disabled.value || maxDisabled.value) return
    if (type === 'label' && labelDisabled.value) return

    if (isGroup.value) {
      checkboxGroup!.changeEvent(props.label!)
    } else {
      const modelValue = selected.value
        ? props.inactiveValue
        : props.activeValue
      emit(UPDATE_MODEL_EVENT, modelValue)
      nextTick(() => {
        emit(CHANGE_EVENT, modelValue)
      })
      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err) => {
          debugWarn(err)
        })
      }
    }
  }

  return {
    isGroup,
    selected,
    handleCheckboxClick,
  }
}
