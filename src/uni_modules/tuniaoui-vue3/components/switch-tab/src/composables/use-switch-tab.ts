import { nextTick } from 'vue'
import type { SetupContext } from 'vue'
import type { SwitchTabEmits, SwitchTabProps } from '../switch-tab'

export const useSwitchTab = (
  props: SwitchTabProps,
  emits: SetupContext<SwitchTabEmits>['emit']
) => {
  // 点击切换标签
  const tabClickEvent = (index: number) => {
    if (props.disabled) return
    emits('update:modelValue', index)
    nextTick(() => {
      emits('change', index)
    })
  }

  return {
    tabClickEvent,
  }
}
