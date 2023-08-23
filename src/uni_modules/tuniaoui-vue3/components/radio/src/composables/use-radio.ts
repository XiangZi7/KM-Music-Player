import { computed, nextTick } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { useRadioCommonProps } from './use-radio-common-props'

import type { SetupContext } from 'vue'
import type { RadioEmits, RadioProps } from '../radio'

export const useRadio = (
  props: RadioProps,
  emits: SetupContext<RadioEmits>['emit']
) => {
  const {
    radioGroupContext: radioGroup,
    disabled,
    labelDisabled,
  } = useRadioCommonProps(props)

  // 判断是否为单选组
  const isGroup = computed(() => !!radioGroup)

  const modelValue = computed<RadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioGroup!.modelValue : props.modelValue!
    },
    set(val) {
      if (isGroup.value) {
        radioGroup!.changeEvent(val)
      } else {
        emits(UPDATE_MODEL_EVENT, val)
      }
    },
  })

  // radio标签点击事件
  const radioClickEvent = (type: 'radio' | 'label') => {
    if (disabled.value) return
    if (type === 'label' && labelDisabled.value) return
    modelValue.value = props.label
    nextTick(() => {
      emits(CHANGE_EVENT, props.label)
    })
  }

  return {
    isGroup,
    modelValue,
    radioClickEvent,
  }
}
